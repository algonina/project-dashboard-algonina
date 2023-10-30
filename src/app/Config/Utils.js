export const statusMember = [
  { value: '0', label: 'Not Active' },
  { value: '1', label: 'Active' },
  { value: '2', label: 'Promoted to next grade' },
  { value: '3', label: 'Other' },
];

export const dayOption = [
  { value: 'Senin', label: 'Senin' },
  { value: 'Selasa', label: 'Selasa' },
  { value: 'Rabu', label: 'Rabu' },
  { value: 'Kamis', label: 'Kamis' },
  { value: 'Jumat', label: 'Jumat' },
  { value: 'Sabtu', label: 'Sabtu' },
  { value: 'Minggu', label: 'Minggu' },
];

export const statusStudent = [
  { value: '0', label: 'Not Active' },
  { value: '1', label: 'Active' },
  { value: '2', label: 'Graduate' },
  { value: '3', label: 'Drop Out' },
  { value: '4', label: 'Suspension' },
];

export const optionsYesOrNo = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Yes' },
];

export const menuHeader = [
  {
    value: '1',
    label: 'Yes',
  },
  {
    value: '0',
    label: 'No',
  },
];

export const optionsTypeInput = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'file', label: 'File' },
  { value: 'radio', label: 'Radio' },
];

export const convertStatus = (value = '') => {
  var status = 'UNCONFIRMED / PENDING';
  switch (value) {
    case '1':
      status = 'SUCCESS';
      break;
    case '2':
      status = 'REJECTED';
      break;
    default:
      status = 'UNCONFIRMED / PENDING';
      break;
  }

  return status;
};

export const selected = (value, options = []) => {
  let select = options.filter((item) => item.value.toString() === value.toString());

  return select.length ? select[0] : { label: 'Please Select the option', value: '' };
};
