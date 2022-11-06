import SearchAppBar from './search-bar';

export default {
  title: 'SearchBar',
  component: SearchAppBar,
  argTypes: {
    color: { control: 'radio', options: ['secondary', 'grey'] },
  },
};

const Template = (args) => <SearchAppBar {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  color: 'grey',
};

export const Primary = Template.bind({});
Primary.args = { color: 'secondary' };

export const Basic = Template.bind({});
Basic.args = { basic: true, color: 'transparent' };
