import { useEffect, useRef } from 'react';

import { Box } from '@mui/system';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../config/debug';
import useConfiguration from '../../hooks/use-configuration';
import { getCret } from '../../store/actions/captcha-actions';

const CaptchaComponent = () => {
  const dispatch = useDispatch();
  const config = useConfiguration();

  let certData = useSelector((state) => state.getCaptchaData.certData);

  const certDataRef = useRef();

  const onHandleCaptcha = (captcha) => {
    // let captcha =
    //   '03AIIukzirZKli2veoGMjo4aVrMXdZMQuc3ZDG0SGZYYaDxWDzTYoZfD0ZbZF_wi4vFlGWuqwYsc7Mpc9HK9pphDIsQtZlX2Pdy2hDN3zSlKpjD_e3NQ_4oR7F8-4jq2ejbGHyo6sftapFFjqvqAN_IJS7sscTbJI27i2Q47cc8D0YaDFtGacgMtVdY1faEMi_4_XFHgoUkyij4599j6V-HxVxmsiP6AG3z3ZmX79ffStvcHDF-TurFswfejY-fCKQax7lH88rnijxelVb_syXoXX_34WBCWZ2umqQQPkCYLPm-Rdo_wEzFB90J3zI_qTQY5gpzxrstp_llN_XdqVTnu4CLZ2ujDM_lSgemg-w9DSED886nb1DVItb75YG24CMhZ9v7Xxie2BslZQsHmh1FWE-OYvMxALvMuR9-UVeo7gjLdaPIPaPV7d-_hnCSkx-nWX5TS_rM8Kfjc823Fd42mdNmqfC-3J3Xr2AVb7oipnkOeabJMCv7I-3hNG8zbru58FBFsYhYbgYbupxa-hZzh6fzamZXK9ASXJT7bnccANQJfBvJPS9gmhMiVDJpbf_wrqltYEBkrWc7xq_11d-i9CMOTjiSdraBeJO7HfFkbPZhppzHqgqoFQNbl0uOvs21yELozHIybkmgi_cFP03aUhjSktkwprjJ9VQhiIeNqIOWNK7ygCiNusuc3o4NonLvVhhJtu2-BRJl58jCfMfjTDkKHiOg-0VW2rYNek-5NcDu9T5jnlmysb6Ks4e9telFJ92r_odDzQrzrD4XGtXRguoX7ho_4B4DX4uFEtcRZ_SYSW64M7WFy7q6afSHzvc5e2WHgb3szUNfYwhEt-Dru90CxgxSRkIRDFoWB_Qv-UZtTPksus6fAlxiId6h9abVCGEOCKpM2KlQV8k4cdPDjltsdlstl8Xw5cAz0g6k2H7d9oUzzpnI2KODN-o4Akrq6sGdrXM_3w6W4-Mtm1KX9JZ2Xqj0Rpf2PyiBhO9wU9Aqfl14wjgFuXk355FLKm9Z7_tT2N4B7T52MVO3dz6VpY6GRgNos-t4snxhpmloTT0zUgMZIR0B-Mqvlu_jwk9ZvbiBqMLaqy7znifXZ79BdpEYGOuKeR8murJGLYyGudS7x0km1JAJ9Ddod8Y_-E3L1NZFP0VCeSf1ehzcZT1MnuJ9vOd5kwlqqc1jUManBGy0hxv4IusTpoz5vp7zdwOSMOmkl2WGnr8OWkTDls3I7y3hzEIFz8dHfvi8l8wPCKxrZ-hYKNrPyc4b5Bo8aDv8lpU3ULf8vwQ7-5zRo70ctfIn6TZbKkjPg';

    if (!localStorage.getItem('st_publicKey')) {
      dispatch(getCret());
    }

    localStorage.setItem('st_captchaToken', captcha);
    localStorage.setItem('captchaToken', captcha);
  };

  useEffect(() => {
    if (certData?.data.length > 0) {
      certDataRef.current = certData.data;

      const localstoragePublicKey = localStorage.getItem('st_publicKey');

      if (!localstoragePublicKey) {
        localStorage.setItem('st_publicKey', certData.data);
      }
    }
  }, [certData]);

  return (
    <Box sx={{ mt: 2 }}>
      {verboseLog('config?.env?.captchaKey', config?.env?.captchaKey)}
      {config.env?.captchaKey && (
        <ReCAPTCHA
          style={{ display: 'inline-block' }}
          theme="light"
          sitekey={config.env?.captchaKey}
          onChange={onHandleCaptcha}
        />
      )}
    </Box>
  );
};

export default CaptchaComponent;
