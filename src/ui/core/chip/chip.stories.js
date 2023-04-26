import { Chip } from './chip';

export default {
  title: 'Chip',
  component: Chip,
};

const Template = (args) => <Chip {...args}></Chip>;

export const submitted = Template.bind({});
submitted.args = {
  label: 'Submitted',
  submitted,
};
export const approved = Template.bind({});
approved.args = {
  label: 'Approved',
  approved,
};
export const reject = Template.bind({});
reject.args = {
  label: 'Reject',
  reject,
};
export const pending = Template.bind({});
pending.args = {
  label: 'Pending',
  pending,
};
