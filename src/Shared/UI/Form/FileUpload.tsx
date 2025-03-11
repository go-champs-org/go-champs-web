import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadHttpClient from '../../httpClient/uploadHttpClient';
import './FileUpload.scss';
import { Trans, useTranslation } from 'react-i18next';
import { FieldRenderProps } from 'react-final-form';

export interface FileReference {
  filename: string;
  publicUrl: string;
  url: string;
}

interface FileUploadProps
  extends FieldRenderProps<FileReference[], HTMLElement> {
  maxFiles?: number;
  initialUploadedFiles?: FileReference[];
}

function FileUpload({
  maxFiles = 1,
  initialUploadedFiles = [],
  input
}: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileReference[]>(
    initialUploadedFiles
  );
  const { t } = useTranslation();

  const onDrop = async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      // 1. Get presigned URL from Elixir backend
      const {
        data: { filename, url, public_url: publicUrl }
      } = await uploadHttpClient.postUploadPresignedUrl({
        filename: file.name,
        content_type: file.type,
        size: file.size
      });

      // 2. Upload directly to Cloudflare R2 using XMLHttpRequest to track progress
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = event => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded * 100) / event.total
          );
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const cleanUrl = new URL(url);
          cleanUrl.search = '';
          setUploadedFiles(prevFiles => [
            ...prevFiles,
            {
              filename,
              url: cleanUrl.toString(),
              publicUrl
            }
          ]);
          input.onChange([
            ...uploadedFiles,
            {
              filename,
              url: cleanUrl.toString(),
              publicUrl
            }
          ]);
        } else {
          setError(t('uploadError'));
        }
        setIsUploading(false);
        setUploadProgress(0);
      };

      xhr.onerror = () => {
        setError(t('uploadError'));
        setIsUploading(false);
        setUploadProgress(0);
      };

      xhr.send(file);
    } catch (err) {
      if (
        err &&
        (err as any).response &&
        (err as any).response.data &&
        (err as any).response.data.error
      ) {
        setError(err.response.data.error);
      } else {
        setError(t('uploadError'));
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFile = async (file: FileReference, index: number) => {
    try {
      await uploadHttpClient.deleteFile(file.url);

      const newFiles = uploadedFiles.filter((_, i) => i !== index);
      setUploadedFiles(newFiles);
      input.onChange(newFiles);
    } catch (err) {
      setError(t('deleteError'));
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections
  } = useDropzone({
    onDrop,
    maxFiles,
    accept: {
      'image/*': ['.jpeg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  if (fileRejections.length > 0) {
    setError(t('uploadError'));
  }

  return (
    <div className="upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="upload-progress">
            <progress value={uploadProgress} max="100" />
            <span>{uploadProgress}%</span>
          </div>
        ) : (
          <p>
            <Trans>uploadDropFiles</Trans>
          </p>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="uploaded-files">
        <h3>
          <Trans>uploadFiles</Trans>
        </h3>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              {file.filename}
              <button
                className="button is-small"
                onClick={event => {
                  event.preventDefault();
                  deleteFile(file, index);
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-trash"></i>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
