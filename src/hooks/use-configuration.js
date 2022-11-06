import { useEffect, useState } from 'react';

export const useConfiguration = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    setConfig({
      env: {
        apiURL: process.env.REACT_APP_API_URL,
        deployEnv: process.env.REACT_APP_DEPLOY_ENV,
        captchaKey: process.env.REACT_APP_GOOGLE_SITE_KEY,
      },
    });
  }, []);

  return config;
};

export default useConfiguration;
