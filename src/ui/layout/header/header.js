import 'react-toastify/dist/ReactToastify.css';

import { Box } from '@mui/material';

import { Navbar } from '../../core/navigation/navigation';
import { LogoWrapper } from './components/logo-wrapper/logo-wrapper';
import { TopBar } from './components/top-bar/top-bar';

// import { useDispatch, useSelector } from 'react-redux';
// import { Slide, toast, ToastContainer } from 'react-toastify';
// import { getNavMeta } from '../../../constants/navigation-meta';
// import { login, logout } from '../../../store/reducers/common-reducers';
import styles from './header.module.scss';

export const Header = () => {
  // const navigate = useNavigate();
  // const loggedIn = useSelector((state) => state.login.isloggedIn);
  // const navMeta = getNavMeta(loggedIn);
  // const time = useSelector((state) => state.login.timer);
  // const dispatch = useDispatch();
  // const [timeOutId, setTimeOutId] = useState(0);

  // const setLoginTimeOut = () =>
  //   setTimeout(() => {
  //     stopTimer();
  //   }, 0.5 * 60000);

  // function redirectHome() {
  //   // document.getElementById('HomeTab').click();
  //   navigate('/');
  // }

  // function startTimer() {
  //   dispatch(login());
  //   setTimeOutId(setLoginTimeOut());
  //   successToast('Login Successful', 'login', 'success');
  // }

  // function stopTimer() {
  //   if (timeOutId) {
  //     clearTimeout(timeOutId);
  //     setTimeOutId(0);
  //   }
  //   dispatch(logout());
  //   successToast('Logout Successful', 'logout', 'error');
  //   redirectHome();
  // }

  // const activeToggle = ({ isActive }) => ({
  //   ...(isActive ? { textDecoration: 'underline', color: 'red' } : null),
  // });

  return (
    <Box>
      <TopBar />
      <LogoWrapper />
      <Navbar />
      <div className={styles.main}>
        {/* <div>
          {loggedIn ? (
            <div className={styles.loginDiv}>
              <Button
                variant="contained"
                color="secondary"
                data-testid="logoutbtn"
                onClick={stopTimer}
              >
                {t('Logout')}
              </Button>
              <p data-testid="timer">{time}</p>
            </div>
          ) : (
            <div className={styles.loginDiv}>
              <Button
                variant="contained"
                color="primary"
                data-testid="loginbtn"
                onClick={startTimer}
              >
                {t('Login')}
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>
                {t('Sign Up')}
              </Button>
            </div>
          )}
        </div> */}
        {/* <div>
          <Button variant="contained" color="primary" onClick={() => navigate('/customform')}>
            {'Custom Form'}
          </Button>
        </div> */}

        {/* <ToastContainer></ToastContainer> */}
      </div>
    </Box>
  );
};

// const successToast = (message, operation, toastType) => {
//   toast(message, {
//     toastId: `${operation}-success-toast`,
//     position: 'bottom-right',
//     transition: Slide,
//     type: toastType,
//     autoClose: 2000,
//     hideProgressBar: true,
//     closeButton: false,
//     closeOnClick: false,
//     draggable: false,
//     style: {
//       borderRadius: '5px',
//       textAlign: 'center',
//       color: '#0a203e',
//       fontSize: '16px',
//       letterSpacing: '1.2px',
//       fontWeight: '500',
//     },
//   });
// };
