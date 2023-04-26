import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Select } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
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
  // const theme = useTheme();
  return (
    <Select
      className={styles.MultilingualSelect}
      labelId="languageOption-label"
      id="languageOption"
      value={languageValue}
      onChange={handleChange}
      sx={{
        '.MuiSelect-select': {
          paddingTop: '0',
          paddingBottom: '0',
          pr: 0,
        },
      }}
      inputProps={{
        className: 'languageSelect',
        '&:focus, &:hover': {
          outline: 'none',
        },
      }}
      IconComponent={(props) => (
        <KeyboardArrowDownIcon
          fontSize="width24"
          sx={{
            '.MuiSvgIcon-root.MuiSelect-iconOutlined': {
              color: 'primary.main',
            },
          }}
          {...props}
        />
      )}
    >
      {languageOption.map((item, index) => (
        <MenuItem
          className={styles.topBarLanguageMenu}
          key={index}
          value={item.value}
          onClick={handleChange}
        >
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
};
