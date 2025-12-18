import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import type { ReactCropperElement } from 'react-cropper';
import api from '../../api/axiosInstance';

interface UploadResponse {
  id: number;
  filename: string;
  filepath: string;
}

interface PhotoUploaderCropperProps {
  onUploadComplete: (data: UploadResponse) => void;
  aspectRatio?: number; 
}

const PhotoUploaderCropper: React.FC<PhotoUploaderCropperProps> = ({
  onUploadComplete,
  aspectRatio = 1,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post<UploadResponse>('/image/load', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onUploadComplete(response.data);
    } catch (err) {
      console.error('Ошибка загрузки файла:', err);
      alert('Ошибка загрузки файла');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
    setIsCropping(true);
  };

  const handleCropAndUpload = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
      width: 512,
      height: 512,
      imageSmoothingQuality: 'high',
    });

    canvas.toBlob((blob: Blob | null) => {
      if (!blob) return;
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      uploadFile(file);
      setIsCropping(false);
    }, 'image/jpeg', 0.9);
  };

  return (
    <div className="photo-uploader">
      {!isCropping && (
        <div
          className="photo-placeholder"
          onClick={() => inputRef.current?.click()}
        >
          <img src="public/photo.svg" alt="placeholder" />
          <p>Нажмите для выбора фото</p>
        </div>
      )}

      {isCropping && image && (
        <div className="cropper-wrapper">
          <Cropper
            ref={cropperRef}
            src={image}
            style={{ height: 400, width: '100%' }}
            aspectRatio={aspectRatio}
            guides={false}
            viewMode={1}
            background={false}
            responsive
            autoCropArea={1}
          />

          <div className="cropper-actions">
            <button onClick={handleCropAndUpload}>Обрезать и загрузить</button>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PhotoUploaderCropper;
