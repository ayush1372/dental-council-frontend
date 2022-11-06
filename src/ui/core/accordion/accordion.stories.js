import { Accordion } from './accordion';

export default {
  title: 'Accordion',
  component: Accordion,
};

const Template = (args) => <Accordion {...args}></Accordion>;

export const Primary = Template.bind({});
Primary.args = {
  content: [
    {
      title: 'What is ABHA number?',
      body: 'ABHA number is a 14 digit number that will uniquely identify you as a participant in India’s digital healthcare ecosystem. ABHA number will establish a strong and trustable identity for you that will be accepted by healthcare providers and payers across the country',
    },
    {
      title: 'What is ABHA Address?',
      body: 'ABHA (Ayushman Bharat Health Account) Address is a unique identifier (self declared username) that enables you to share and access your health records digitally. Your ABHA address may look like ‘yourname@consent manager’.For instance, xyz@abdm is a ABHA address with ABDM Consent Manager that will facilitate health data exchange for you with appropriate consent on the ABDM network',
    },
    {
      title: 'Linking ABHA number with ABHA address',
      body: 'You can use your ABHA number to seamlessly sign up for a ABHA address, and ensure that the health records created for you are shared only with you. To enable health data sharing, it is recommended that you create ABDM ABHA address and link it with your ABHA number .',
    },
  ],
};
