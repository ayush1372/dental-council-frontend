import LogoSlider from '../../shared/logo-slider/logo-slider';
import HeroBanner from './components/hero-banner/hero-banner';

export function Home() {
  return (
    <div data-testid="homepage">
      <HeroBanner />
      <LogoSlider />
    </div>
  );
}
