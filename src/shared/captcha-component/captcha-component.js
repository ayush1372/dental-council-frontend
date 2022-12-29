import { useState } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

const CaptchaComponent = () => {
  const { generateCaptcha } = useSelector((state) => state.login);
  // eslint-disable-next-line no-console
  console.log('image', generateCaptcha);

  const [anwser, setAnwser] = useState();
  const [error, setError] = useState();

  const reloadCaptcha = () => {};

  const handleChange = (e) => {
    setAnwser(e.target.value);
  };

  const onFocusChange = (e) => {
    e.preventDefault();
    const userResponse = anwser;
    if (!userResponse) {
      setError('Invalid code!!');
      return;
    } else {
      setError(null);
    }
  };

  return (
    <Box className="captcha-parent">
      <Box className="captcha-child">
        <Box className="row-captcha">
          <Box className="column-captcha">
            {' '}
            <img
              src={`data:image/png;base64,${generateCaptcha?.image}`}
              alt="captcha"
              width="150"
              height="100"
              className="captcha-image"
            />
            <Box>
              <Box className="img-refresh">
                <RefreshIcon onClick={reloadCaptcha} />
              </Box>
            </Box>
          </Box>

          <Box className="column-captcha">
            <Box className="answer">Type answer-</Box>{' '}
            <Box>
              <input
                className={`${!error ? 'text-captcha' : 'text-captcha-danger'}`}
                name="anwser"
                type="text"
                minLength="1"
                maxLength="6"
                size={10}
                height={4}
                // disabled={disabled}
                placeholder="Code"
                value={anwser}
                onBlur={onFocusChange}
                onChange={handleChange}
              />{' '}
            </Box>
          </Box>
        </Box>
        <Box className="error-span">{error && error.length > 0 && <span>{error}</span>}</Box>
      </Box>
    </Box>
  );
};

export default CaptchaComponent;
