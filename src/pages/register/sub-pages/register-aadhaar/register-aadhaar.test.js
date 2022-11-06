import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import WizardSteps from '../../../../ui/core/wizard/wizard-steps';
import AadhaarRegister from './register-aadhaar';

test('renders', () => {
  render(
    <Router>
      <AadhaarRegister />
    </Router>
  );
});

test('renders Stepper', () => {
  render(
    <Router>
      <WizardSteps steps={stepsKeys} />
    </Router>
  );
});

const stepsKeys = [
  'Consent Collection',
  'Aadhaar Authentication',
  'Profile Completion',
  'Process Completed',
];

describe('WizardSteps Render', () => {
  test('WizardSteps > Check WizardSteps is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <WizardSteps />
      </Router>
    );
    const StepButton_0 = getByTestId('step_0_button');
    expect(StepButton_0).toEqual('Consent Collection');
  });
});
