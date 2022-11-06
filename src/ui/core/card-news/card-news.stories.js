import CardImage from '../../../assets/images/card-image.png';
import { CardNews } from './card-news';

export default {
  title: 'Card/CardNews',
  component: CardNews,
};

const Template = (args) => <CardNews {...args}></CardNews>;

export const NewsCardWithButton = Template.bind({});
NewsCardWithButton.args = {
  imageUrl: CardImage,
  title:
    'ABDM will aid universal health coverage in accessible, affordable, timely manner: R S Sharma',
  subTitle: 'By Money Control',
  publishedDate: 'Published on 08 March, 2022',
  buttonLabel: 'Read More',
  href: '#',
};

export const NewsCardWithLink = Template.bind({});
NewsCardWithLink.args = {
  imageUrl: CardImage,
  imageAlt: 'alternative text',
  title:
    'ABDM will aid universal health coverage in accessible, affordable, timely manner: R S Sharma',
  subTitle: 'By Money Control',
  publishedDate: 'Published on 08 March, 2022',
  buttonLabel: 'Read More',
  linkCard: true,
  href: '#',
};
