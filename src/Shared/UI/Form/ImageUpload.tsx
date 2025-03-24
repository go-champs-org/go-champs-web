import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageUpload.scss';
import Modal from '../Modal';

interface CropperModalProps {
  src: string;
  crop: Crop;
  setCrop: (crop: Crop) => void;
  onCropComplete: () => void;
  onImageLoaded: (image: HTMLImageElement) => void;
}

function CropperModal({
  src,
  crop,
  setCrop,
  onCropComplete,
  onImageLoaded
}: CropperModalProps) {
  return (
    <Modal
      isOpenFromOutside
      content={
        <div className="card">
          <div className="card-content">
            <div className="columns is-multiline">
              <div className="column is-12 has-text-centered">
                <ReactCrop
                  crop={crop}
                  aspect={1}
                  circularCrop
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
                  <button className="button is-info">Link</button>
                  <button className="button is-primary">Primary</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    ></Modal>
  );
}

interface ImageUploadProps {
  onImageCropped: (croppedImageUrl: string) => void;
}

function ImageUpload({ onImageCropped }: ImageUploadProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    width: 50,
    height: 50,
    x: 25,
    y: 25,
    unit: 'px'
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
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
        onImageCropped(base64Image);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {src && (
        <CropperModal
          src={src}
          crop={crop}
          setCrop={setCrop}
          onCropComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
        />
      )}
    </div>
  );
}

export default ImageUpload;
