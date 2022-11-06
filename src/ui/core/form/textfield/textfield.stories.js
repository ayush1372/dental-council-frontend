import { useForm } from 'react-hook-form';

import { TextField } from './textfield';

export default {
  title: 'form/TextField',
  component: TextField,
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'radio', options: [true, false] },
  },
};

const Template = (args) => {
  const { register } = useForm();

  return <TextField {...args} register={register}></TextField>;
};

// const Template = (args) => <TextField {...args}></TextField>;

export const Playground = Template.bind({});
Playground.args = {
  placeholder: 'Playground',
  variant: 'outlined',
};

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Primary',
  variant: 'outlined',
};
export const Error = Template.bind({});
Error.args = {
  placeholder: 'Error',
  variant: 'outlined',
  error: true,
};
export const Success = Template.bind({});
Success.args = {
  placeholder: 'Success',
  variant: 'outlined',
  color: 'success',
  success: true,
  text: 'in message',
};
export const Password = Template.bind({});
Password.args = {
  placeholder: 'Password',
  variant: 'outlined',
  type: 'password',
  id: 'outlined-password-input',
  autoComplete: 'current-password',
};

export const MobileOtp = Template.bind({});
MobileOtp.args = {
  placeholder: '1234567890',
  variant: 'outlined',
  color: 'messageBlue',
  messageBlue: true,
};
