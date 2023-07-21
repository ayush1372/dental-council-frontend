import CN from 'clsx';

import { ReactComponent as aadhaarIcon } from './icons/aadhaar.svg';
import { ReactComponent as ArrowLeft } from './icons/arrow_back_black_48dp.svg';
import { ReactComponent as ArrowTop } from './icons/arrow_upward_black_48dp.svg';
import { ReactComponent as Call } from './icons/call_black_48dp.svg';
import { ReactComponent as Cancel } from './icons/cancel_black_24dp.svg';
import { ReactComponent as CheckCircleOutline } from './icons/check_circle_outline_black_24dp.svg';
import { ReactComponent as drivingLicenseIcon } from './icons/driving-licence.svg';
import { ReactComponent as Error } from './icons/error_outline_black_24dp.svg';
import { ReactComponent as HelpOutline } from './icons/help_outline_black_24dp.svg';
import { ReactComponent as Language } from './icons/ico-language.svg';
import { ReactComponent as Notification } from './icons/ico-notification.svg';
import { ReactComponent as Text } from './icons/ico-text-size.svg';
import { ReactComponent as KeyboardDown } from './icons/keyboard_arrow_down_black_48dp.svg';
import { ReactComponent as KeyboardRight } from './icons/keyboard_arrow_right_black_48dp.svg';
import { ReactComponent as Menu } from './icons/menu_black_48dp.svg';
import { ReactComponent as PlayCircleOutline } from './icons/play_circle_black_48dp.svg';
import { ReactComponent as PlayCircleFill } from './icons/play_circle_filled_black_48dp.svg';
import { ReactComponent as SearchIcon } from './icons/search_black_48dp.svg';
import { ReactComponent as Setting } from './icons/settings_black_48dp.svg';
import { ReactComponent as Visibility } from './icons/visibility_black_48dp.svg';
import { ReactComponent as VisibilityOff } from './icons/visibility_black_48dp.svg';

import styles from './svg-icons.module.scss';

const ICON = {
  aadhaar: aadhaarIcon,
  arrowLeft: ArrowLeft,
  arrowTop: ArrowTop,
  drivingLicence: drivingLicenseIcon,
  searchIcon: SearchIcon,
  setting: Setting,
  cancel: Cancel,
  error: Error,
  menu: Menu,
  visibilityOff: VisibilityOff,
  visibility: Visibility,
  call: Call,
  helpOutline: HelpOutline,
  checkCircleOutline: CheckCircleOutline,
  notification: Notification,
  language: Language,
  text: Text,
  keyboardDown: KeyboardDown,
  keyboardRight: KeyboardRight,
  playCircleFill: PlayCircleFill,
  playCircleOutline: PlayCircleOutline,
  checkCircle: CheckCircleOutline,
};

export const ICONS_NAME_LIST = Object.keys(ICON);

export const SvgImageComponent = ({ icon, height, width, fill = 'currentColor', newPassword }) => {
  const Component = ICON[icon];
  return (
    <Component
      className={CN({
        [styles.primary]: fill === 'primary',
        [styles.secondary]: fill === 'secondary',
        [styles.grey]: fill === 'grey',
      })}
      fill={fill}
      height={height ?? '14px'}
      width={width ?? '14px'}
      style={{ 'margin-top': icon === 'error' ? (newPassword ? '-2px' : '0px') : '0px' }}
    />
  );
};
