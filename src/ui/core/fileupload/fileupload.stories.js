import UploadFile from './fileupload';
export default {
  title: 'File Upload',
  component: UploadFile,
};

const Template = (args) => <UploadFile {...args}></UploadFile>;

export const Playground = Template.bind({});
Playground.args = {
  variant: 'contained',
  children: 'Playground',
  sizeAllowed: 5,
  fileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
};

export const FileUploadWithBrowse = Template.bind({});
FileUploadWithBrowse.args = {
  showBrowse: true,
  uploadFiles: 'single',
  label: 'Upload Documents',
  sizeAllowed: 5,
  fileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
  fileMessage: 'JPEG, JPEG, PNG file types are supported',
};

export const FileUploadWithoutBrowse = Template.bind({});
FileUploadWithoutBrowse.args = {
  uploadFiles: 'multiple',
  label: 'Upload Documents',
  sizeAllowed: 5,
  fileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
  fileMessage: 'JPEG, PNG, GIF file types are supported',
};
