import { useTranslation } from 'react-i18next';

import styles from './form-input.module.css';

const TextField = ({ type, name, error, placeholder, register, config, labelText }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.inputText}>
      {labelText && <label htmlFor={name}>{labelText}</label>}

      <input
        className={styles.inputContent}
        type={type || 'text'}
        name={name}
        placeholder={t(placeholder || '')}
        {...register(name, config)}
      />

      {error && <p className={styles.invalid}>{error?.message}</p>}
    </div>
  );
};

export default TextField;
