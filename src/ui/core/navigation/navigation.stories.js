import { Navbar } from './navigation';

export default {
  title: 'Navbar',
  component: Navbar,
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'grey'] },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'radio', options: [true, false] },
  },
};

const Template = (args) => <Navbar {...args}></Navbar>;

export const Playground = Template.bind({});
Playground.args = {
  variant: 'contained',
  children: 'Playground',
};
