import ImageIcon from '../../../assets/images/image-icon.png';
import { Card } from './card';

export default {
  title: 'Card/BasicCard',
  component: Card,
};

const Template = (args) => <Card {...args}></Card>;

export const CardWithHeadingAndBodyText = Template.bind({});
CardWithHeadingAndBodyText.args = {
  title: 'National Health Authority India',
  subheader: '11 April 2022',
  content:
    'Request for Proposal (RFP) for selection of Creative Agency for creating awareness through information, Education and communication...',
};

export const CardWithIconButton = Template.bind({});
CardWithIconButton.args = {
  title: 'National Health Authority India',
  subheader: '11 April 2022',
  content:
    'Request for Proposal (RFP) for selection of Creative Agency for creating awareness through information, Education and communication...',
  button: true,
  icon: true,
  iconWidth: '34px',
  iconHeight: '34px',
  label: 'Read More',
  svgIcon: 'checkCircleOutline',
  blockButton: true,
};

export const CardWithIconLink = Template.bind({});
CardWithIconLink.args = {
  title: 'National Health Authority India',
  subheader: '11 April 2022',
  content:
    'Request for Proposal (RFP) for selection of Creative Agency for creating awareness through information, Education and communication...',
  link: true,
  icon: true,
  iconWidth: '34px',
  iconHeight: '34px',
  href: '#',
  label: 'Read More',
  svgIcon: 'checkCircleOutline',
};

export const CardWithPrimaryButton = Template.bind({});
CardWithPrimaryButton.args = {
  title: 'National Health Authority India',
  subheader: '11 April 2022',
  content:
    'Request for Proposal (RFP) for selection of Creative Agency for creating awareness through information, Education and communication...',
  button: true,
  icon: true,
  iconWidth: '34px',
  iconHeight: '34px',
  href: '#',
  label: 'Read More',
  svgIcon: 'setting',
};

export const CardWithStatusTag = Template.bind({});
CardWithStatusTag.args = {
  title: 'National Health Authority India',
  subheader: '11 April 2022',
  content:
    'Request for Proposal (RFP) for selection of Creative Agency for creating awareness through information, Education and communication...',
  button: true,
  iconWidth: '34px',
  iconHeight: '34px',
  label: 'Download',
  svgIcon: 'setting',
  statusTag: true,
  actionList: [
    'Consultation Paper',
    'Consultation Paper',
    'Consultation Paper',
    'Consultation Paper',
    'Consultation Paper',
  ],
};

export const CardWithImageIcon = Template.bind({});
CardWithImageIcon.args = {
  title: 'National Health Authority India',
  subheader: '11 April 2022',
  button: true,
  label: 'Download',
  svgIcon: 'setting',
  iconWidth: '34px',
  iconHeight: '34px',
  imageIcon: true,
  imageUrl: ImageIcon,
  imageAlt: 'alternative text',
};
