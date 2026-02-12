import React, { useState, useRef } from 'react';
import api from '../../api/axiosInstance';

interface UploadResponse {
  id: number;
  filename: string;
  filepath: string;
}

interface PhotoUploaderProps {
  onUploadComplete: (data: UploadResponse) => void;
  isPrivate?: boolean;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onUploadComplete, isPrivate = true }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      if (isPrivate) {
      const response = await api.post<UploadResponse>('/image/load/private', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

        onUploadComplete(response.data);
      } else {
        const response = await api.post<UploadResponse>('/image/load/public', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        onUploadComplete(response.data);
      }
    } catch (err) {
      console.error('Ошибка загрузки файла:', err);
      alert('Ошибка загрузки файла');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadFile(file);
    }
  };

  return (
    <div className="photo-uploader" onClick={() => inputRef.current?.click()}>
      {preview ? (
        <img src={preview} alt="preview" className="photo-preview" />
      ) : (
        <div className="photo-placeholder">
          <img src="public/photo.svg" alt="placeholder" />
          <p>Нажмите для выбора фото</p>
        </div>
      )}

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
};

export default PhotoUploader;
