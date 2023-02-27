import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import WizardSteps from './wizard-steps';

test('renders Stepper', () => {
  render(
    <Router>
      <WizardSteps steps={stepsKeys} />
    </Router>
  );
});

const stepsKeys = ['Step 1'];

describe('WizardSteps Render', () => {
  test('WizardSteps > Check WizardSteps is rendered', () => {
    const { getByTestId } = render(
      <Router>
        <WizardSteps steps={stepsKeys} />
      </Router>
    );
    const StepButton_0 = getByTestId('step_0_button');
    expect(StepButton_0).toBeInTheDocument();
  });
});
