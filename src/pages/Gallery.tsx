import { useState, type FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import MainLayout from '../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import settings from '../api/config';

interface IPhoto {
  id: number;
  url: string;
}

const Gallery: FC = () => {
  const [activeItem, setActiveItem] = useState('gallery');
  const [activePhoto, setActivePhoto] = useState<IPhoto | null>(null);
  const params = useParams();

  const { data, error, isLoading } = useSWR<IPhoto[]>(
    '/gallery/' + params.userId,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  if (error) {
    return <div>Ошибка загрузки галереи</div>;
  }

  return (
    <MainLayout
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      pageName="gallery"
    >
      <div className="gallery-container">
        <h1 className="gallery-title">Фотографии</h1>

        {isLoading && <div>Загрузка...</div>}

        <div className="gallery-grid">
          {data?.map((photo) => (
            <div
              key={photo.id}
              className="gallery-item"
              onClick={() => setActivePhoto(photo)}
            >
              <img src={settings.apiBaseUrl + photo.url} alt="photo" />
            </div>
          ))}
        </div>

        {activePhoto && (
          <div className="gallery-modal" onClick={() => setActivePhoto(null)}>
            <div
              className="gallery-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={settings.apiBaseUrl + activePhoto.url} alt="full" />
              <button
                className="gallery-close"
                onClick={() => setActivePhoto(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Gallery;
