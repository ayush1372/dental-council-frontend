import { SvgImageComponent } from '../svg-icons';
import { Button } from './button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'grey'] },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'radio', options: [true, false] },
  },
};

const Template = (args) => <Button {...args}></Button>;

export const Playground = Template.bind({});
Playground.args = {
  variant: 'contained',
  children: 'Playground',
};

export const Filled = Template.bind({});
Filled.args = { color: 'primary', variant: 'contained', children: 'Filled' };

export const Outlined = Template.bind({});
Outlined.args = { color: 'primary', variant: 'outlined', children: 'Outlined' };

export const LinkButton = Template.bind({});
LinkButton.args = { href: '/', children: 'Link Button' };

export const ButtonWithStartIcon = Template.bind({});
ButtonWithStartIcon.args = {
  iconBtn: true,
  color: 'primary',
  variant: 'outlined',
  children: 'Start Icon',
  startIcon: <SvgImageComponent icon="arrowLeft" />,
};

export const ButtonWithEndIcon = Template.bind({});
ButtonWithEndIcon.args = {
  iconBtn: true,
  color: 'grey',
  children: 'End Icon',
  variant: 'contained',
  endIcon: <SvgImageComponent color="primary" icon="arrowTop" />,
};

export const ButtonIcon = Template.bind({});
ButtonIcon.args = {
  color: 'grey',
  variant: 'contained',
  endIcon: <SvgImageComponent icon="searchIcon" />,
};

export const MenuButton = Template.bind({});
MenuButton.args = {
  color: 'primary',
  variant: 'contained',
  children: 'Menu',
};
