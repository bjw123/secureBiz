type InavDropDown = { name: string; key: string };

const questionCategories: Array<InavDropDown> = [
  {
    key: 'AppControl',
    name: 'Application Control',
  },
  {
    key: 'OfficeMacro',
    name: 'Configure Microsoft Office Macro Settings',
  },
  {
    key: 'PatchApp',
    name: 'Patch Applications',
  },
  {
    key: 'Hardening',
    name: 'User Application Hardening',
  },
  {
    key: 'RestrictAdm',
    name: 'Restrict Adminstrative Privileges',
  },
  {
    key: 'MFA',
    name: 'Multi-Factor Authentication',
  },
  {
    key: 'PatchOS',
    name: 'Patch Operating Systems',
  },
  {
    key: 'Backups',
    name: 'Daily Backups',
  },
];

export default questionCategories;
