import httpClient from './httpClient';
import { REACT_APP_API_HOST } from '../env';
import {
  ApiUploadDeleteRequest,
  ApiUploadFileType,
  ApiUploadPostRequest,
  ApiUploadPostResponse
} from './apiTypes';

const UPLOAD_API = `${REACT_APP_API_HOST}v1/upload`;

export interface FileReference {
  filename: string;
  publicUrl: string;
  url: string;
}

interface File extends Document {
  type: string;
}

interface UploadFile {
  file: Blob;
  fileReference: ApiUploadPostRequest;
  setProgress: (progress: number) => void;
  onSucess: (fileReference: FileReference) => void;
  onError: () => void;
}

const postUploadPresignedUrl = async (uploadRequest: ApiUploadPostRequest) =>
  await httpClient.post<ApiUploadPostRequest, ApiUploadPostResponse>(
    `${UPLOAD_API}/presigned-url`,
    uploadRequest
  );

const deleteFile = async ({
  url,
  fileType
}: {
  url: string;
  fileType: ApiUploadFileType;
}) => {
  await httpClient.delete<ApiUploadDeleteRequest>(UPLOAD_API, {
    url,
    file_type: fileType
  });

  return;
};

const singAndUpload = async ({
  file,
  fileReference,
  setProgress,
  onSucess,
  onError
}: UploadFile) => {
  // 1. Get presigned URL from Elixir backend
  const {
    data: { filename, url, public_url: publicUrl }
  } = await postUploadPresignedUrl(fileReference);

  // 2. Upload directly to Cloudflare R2 using XMLHttpRequest to track progress
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url, true);
  xhr.setRequestHeader('Content-Type', file.type);

  xhr.upload.onprogress = event => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded * 100) / event.total);
      setProgress(percentComplete);
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      const cleanUrl = new URL(url);
      cleanUrl.search = '';
      onSucess({ filename, url: cleanUrl.toString(), publicUrl });
    } else {
      onError();
    }
  };

  xhr.onerror = () => {
    onError();
  };

  xhr.send(file);
};

export default {
  deleteFile,
  postUploadPresignedUrl,
  singAndUpload
};
