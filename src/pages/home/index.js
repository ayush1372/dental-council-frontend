import LogoSlider from '../../shared/logo-slider/logo-slider';
import HeroBanner from './components/hero-banner/hero-banner';
import WarningDialog from './components/warning-dialog/warning-dialog';

export function Home() {
  const currentEnv = process.env.REACT_APP_V1_API_URL

  return (
    <div data-testid="homepage">
      {(currentEnv && currentEnv.includes("sbx")) &&
        <WarningDialog />
      }

      <HeroBanner />
      <LogoSlider />
    </div>
  );
}
