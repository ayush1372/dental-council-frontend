import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from '../../ui/layout/header/components/top-bar/top-bar.module.scss';

export const MultilingualDropdown = () => {
  const { i18n } = useTranslation();
  const [languageValue, setLanguageValue] = useState('en');
  const languageOption = [
    { title: 'English', value: 'en' },
    { title: 'Hindi', value: 'hi' },
    { title: 'Telugu', value: 'te' },
    { title: 'French', value: 'fr' },
  ];
  const handleChange = (event) => {
    setLanguageValue(event.target.value ? event.target.value : languageValue);
    i18n.changeLanguage(event.target.value);
  };
  return (
    <Select
      labelId="languageOption-label"
      id="languageOption"
      value={languageValue}
      onChange={handleChange}
      inputProps={{
        '&:focus, &:hover': {
          outline: 'none',
        },
      }}
      IconComponent={() => <KeyboardArrowDownIcon color="primary" />}
      sx={{ color: 'primary.main' }}
    >
      {languageOption.map((item, index) => (
        <MenuItem
          className={styles.topBarLanguageMenu}
          key={index}
          value={item.value}
          onClick={handleChange}
          MenuListProps={{
            disablePadding: true,
            color: 'inputTextColor.main',
          }}
        >
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
};
