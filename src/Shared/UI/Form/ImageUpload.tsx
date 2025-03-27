import React, { useEffect, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageUpload.scss';
import Modal from '../Modal';
import { Trans } from 'react-i18next';
import uploadHttpClient, {
  FileReference
} from '../../httpClient/uploadHttpClient';
import { ApiUploadFileType } from '../../httpClient/apiTypes';
import LoadingButton from '../LoadingButton';
import { FieldRenderProps } from 'react-final-form';

interface CropperModalProps {
  src: string;
  crop: Crop;
  setCrop: (crop: Crop) => void;
  onCropComplete: () => void;
  onImageLoaded: (image: HTMLImageElement) => void;
  onCancel: () => void;
  onUpload: () => void;
  isUploading: boolean;
}

function CropperModal({
  src,
  crop,
  isUploading,
  setCrop,
  onCropComplete,
  onImageLoaded,
  onCancel,
  onUpload
}: CropperModalProps) {
  const handleOnCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    onCancel();
  };
  const handleOnUpload = (event: React.MouseEvent) => {
    event.preventDefault();
    onUpload();
  };
  return (
    <Modal
      isOpenFromOutside
      content={
        <div className="card image-upload-cropper">
          <div className="card-content">
            <div className="columns is-multiline">
              <div className="column is-12 has-text-centered">
                <ReactCrop
                  className="cropper"
                  crop={crop}
                  aspect={1}
                  onComplete={onCropComplete}
                  onChange={newCrop => setCrop(newCrop)}
                  maxHeight={500}
                  maxWidth={500}
                >
                  <img
                    src={src}
                    alt="Crop team logo"
                    onLoad={event => onImageLoaded(event.currentTarget)}
                    style={{ maxWidth: '525px', maxHeight: '525px' }}
                  />
                </ReactCrop>
              </div>
              <div className="column is-12 has-text-centered">
                <div className="buttons" style={{ justifyContent: 'center' }}>
                  <button className="button is-info" onClick={handleOnCancel}>
                    <Trans>cancel</Trans>
                  </button>
                  <LoadingButton
                    isLoading={isUploading}
                    className="button is-primary"
                    onClick={handleOnUpload}
                  >
                    <Trans>upload</Trans>
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    ></Modal>
  );
}

interface ImageUploadProps
  extends FieldRenderProps<FileReference | string, HTMLElement> {
  imageType: ApiUploadFileType;
  initialFileReference?: FileReference;
}

function ImageUpload({
  imageType,
  initialFileReference,
  input
}: ImageUploadProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    width: 50,
    height: 50,
    x: 25,
    y: 25,
    unit: 'px'
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [fileReference, setFileReference] = useState<FileReference | null>();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (initialFileReference) {
      setFileReference(initialFileReference);
    }

    return () => {
      setFileReference(null);
    };
  }, [initialFileReference]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const onImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image);
  };

  const onCropComplete = () => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(
          imageRef,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const base64Image = canvas.toDataURL('image/png');
        setCroppedImage(base64Image);
      }
    }
  };

  const onUpload = async () => {
    if (croppedImage && filename) {
      setIsUploading(true);
      const blob = await (await fetch(croppedImage)).blob();

      await uploadHttpClient.singAndUpload({
        file: blob,
        fileReference: {
          file_type: imageType,
          content_type: 'image/png',
          filename: filename,
          size: blob.size
        },
        setProgress: () => {},
        onSucess: (image: FileReference) => {
          setSrc(null);
          setIsUploading(false);
          setFileReference(image);
          input.onChange(image);
        },
        onError: () => {
          setIsUploading(false);
        }
      });
    }
  };

  const onCancel = () => {
    setSrc(null);
  };

  const onRemove = async (event: React.MouseEvent) => {
    try {
      event.preventDefault();

      if (!fileReference) {
        return;
      }

      setIsDeleting(true);
      await uploadHttpClient.deleteFile({
        url: fileReference.url,
        fileType: imageType
      });
      setIsDeleting(false);
      setImageRef(null);
      setFileReference(null);
      setFilename(null);
      setCroppedImage(null);
      setSrc(null);
      input.onChange(null);
    } catch (error) {
      console.error('Error removing image', error);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="image-placeholder">
        {fileReference ? (
          <img src={fileReference.publicUrl} alt="Uploaded" />
        ) : (
          <div className="placeholder-text">
            <Trans>clickToUpload</Trans>
          </div>
        )}
      </label>
      {src && (
        <CropperModal
          src={src}
          crop={crop}
          setCrop={setCrop}
          onCropComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
          onCancel={onCancel}
          onUpload={onUpload}
          isUploading={isUploading}
        />
      )}
      {fileReference && (
        <LoadingButton
          isLoading={isDeleting}
          className="button is-info is-small remove-button"
          onClick={onRemove}
        >
          <i className="fas fa-eraser"></i>
        </LoadingButton>
      )}
    </div>
  );
}

export default ImageUpload;
