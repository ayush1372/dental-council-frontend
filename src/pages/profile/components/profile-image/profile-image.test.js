import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import avtarImg from '../../../../assets/images/user.png';
import ProfileImage from './profile-image';

describe('Logged in user profile image', () => {
  // render the component
  beforeEach(() => {
    render(<ProfileImage />);
  });

  describe('profile image', () => {
    test('profile image should be present in the document', () => {
      const profileImg = screen.getByTestId('profileImg');
      expect(profileImg).toBeInTheDocument();
    });
    test('profile image should be present in the document with avtarImg in alt attribute', () => {
      const profileImg = screen.getByTestId('profileImg');
      expect(profileImg).toBeInTheDocument();
    });
    test('profile image should be present in the document with given image src', () => {
      const profileImg = screen.getByTestId('profileImg');
      expect(profileImg.src).toContain(avtarImg);
    });
  });
});
