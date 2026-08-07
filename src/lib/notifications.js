import axios from 'axios';
import { requestFcmToken } from './firebase';

const shortText = (value, max = 100) => {
  if (!value) return null;
  return String(value).substring(0, max);
};

const getBrowserName = () => {
  const ua = navigator.userAgent;

  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera';
  if (ua.includes('Chrome/')) return 'Chrome';
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';

  return 'Browser';
};

const getOsName = () => {
  const ua = navigator.userAgent;

  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';

  return navigator.platform || 'Unknown';
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem('device_id');

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('device_id', deviceId);
  }

  return deviceId;
};

export const registerNotificationDevice = async ({
  apiBaseUrl,
  token,
  appPassword,
  appType = 'website',
}) => {
  const fcmToken = await requestFcmToken();

  if (!fcmToken) {
    console.log("FCM token not available");
    return;
  }

  const browser = getBrowserName();
  const os = getOsName();

  const response = await axios.post(
    `${apiBaseUrl}/notifications/devices/register`,
    {
      platform: 'web',
      fcm_token: fcmToken,
      device_id: shortText(getDeviceId(), 100),
      device_name: shortText(`${browser} - ${os}`, 100),
      browser: shortText(browser, 100),
      os: shortText(os, 100),
      timezone: shortText(Intl.DateTimeFormat().resolvedOptions().timeZone, 100),
      app_version: '1.0.0',
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Application-Password': appPassword,
        'X-App-Type': appType,
      },
    }
  );

  localStorage.setItem('fcm_token', fcmToken);

  return response.data;
};
