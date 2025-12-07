import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load settings from localStorage
    const storedTheme = localStorage.getItem('theme');
    const storedNotifications = localStorage.getItem('notifications_enabled');

    if (storedTheme) {
      setTheme(storedTheme);
    }
    if (storedNotifications) {
      setNotifications(storedNotifications === 'true');
    }
  }, []);

  const handleSave = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const payload = {
        notifications_enabled: notifications,
        theme,
      };

      await api.post('/settings', payload);

      // Update localStorage
      localStorage.setItem('theme', theme);
      localStorage.setItem('notifications_enabled', String(notifications));

      navigate('/profile');
    } catch (err) {
      console.error('Failed to save settings:', err);
      setError('Ошибка сохранения настроек');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout activeItem="settings" setActiveItem={() => {}} pageName="settings">
      <div className="settings-container">
        <h1>Настройки</h1>

        <div className="form-group">
          <label htmlFor="theme">Тема</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Уведомления
          </label>
        </div>

        <button onClick={handleSave} disabled={isSubmitting} className="btn-save">
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </button>

        {error && <div className="error">{error}</div>}
      </div>
    </MainLayout>
  );
};

export default Settings;