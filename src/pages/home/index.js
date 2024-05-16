import LogoSlider from '../../shared/logo-slider/logo-slider';
import HeroBanner from './components/hero-banner/hero-banner';
import WarningDialog from './components/warning-dialog/warning-dialog';

export function Home() {

  return (
    <div data-testid="homepage">
      <WarningDialog />
      <HeroBanner />
      <LogoSlider />
    </div>
  );
}
