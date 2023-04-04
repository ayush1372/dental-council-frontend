import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../store/store';
import ActivateLicence from './activate-licence-tab';

describe('Table search', () => {
  describe('Table search fields', () => {
    test('free search should present in the document', () => {
      let modifiedStore = { ...store, loggedInUserType: 'NMC' };
      const { debug } = render(
        <Provider store={modifiedStore}>
          <ActivateLicence setShowHeader={true} showTable={true} />
        </Provider>
      );
      debug();
    });
  });
});
