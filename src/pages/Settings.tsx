import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ModalExitLayout from '../layouts/ModalExitLayout';
import PhotoUploaderCropper from '../features/profile/AvatarUploader';
import ModalUploader from '../features/profile/ModalUploader';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpenModalExit, setIsOpenModalExit] = useState<boolean>(false);
  const [isOpenModalAvatar, setIsOpenModalAvatar] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleSave = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const payload = { theme };
      await api.post('/settings', payload);
      localStorage.setItem('theme', theme);
      navigate('/profile');
    } catch (err) {
      console.error('Failed to save settings:', err);
      setError('Ошибка сохранения настроек');
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatarUpload = async (data: { filepath: string }) => {
    try {
      await api.post('/profile/avatar', { avatarUrl: data.filepath });
    } catch (err) {
      console.error('Ошибка при обновлении аватара:', err);
      alert('Ошибка при обновлении аватара');
    }
  }

  const handleLogout = async () => {
    await api.post('/auth/logout/');
    localStorage.removeItem('theme');
    navigate('/');
  };

  return (
    <MainLayout
      activeItem="settings"
      setActiveItem={() => {}}
      pageName="settings"
    >
      <div className="settings-page-wrapper">
        <div className="settings-card">
          <h1>Настройки</h1>

          <div className="form-group">
            <label htmlFor="theme">Тема оформления</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Светлая</option>
              <option value="dark">Тёмная</option>
            </select>
          </div>

          <div className="avatar-section">
            <button className="btn-upload-avatar" onClick={() => setIsOpenModalAvatar(true)}>Загрузить аватар</button>
          </div>

          <div className="actions-group">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="btn-save"
            >
              {isSubmitting ? 'Сохраняем...' : 'Сохранить'}
            </button>

            <button onClick={() => setIsOpenModalExit(true)} className="btn-logout">
              Выйти из аккаунта
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </div>
      </div>
      {isOpenModalExit && (
        <ModalExitLayout
          onClose={() => setIsOpenModalExit(false)}
          onLeave={handleLogout}
          headerText="ВЫЙТИ ИЗ АККАУНТА"
          message="Вы собираетесь выйти из аккаута"
          exitText="Выйти"
        />
      )}
      {isOpenModalAvatar && (
        <ModalUploader
          title="Загрузить аватар"
          confirmText="Готово"
          cancelText="Отмена"
          // onConfirm={() => setIsOpenModalAvatar(false)}
          onClose={() => {
            setIsOpenModalAvatar(false);
          }}
        >
          <PhotoUploaderCropper
            aspectRatio={1}
            onUploadComplete={(data) => {
              console.log('Аватар загружен:', data);
              avatarUpload(data);
              setIsOpenModalAvatar(false);
            }}
          />
        </ModalUploader>
      )}
    </MainLayout>
  );
};

export default Settings;
