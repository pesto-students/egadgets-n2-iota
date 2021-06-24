import { trimText } from '../helpers/Util';

const menusData = (authData) => {
  return [
    {
      name: 'Home',
      url: '/',
      icons: 'home',
    },
    {
      name:
        authData != null && Object.keys(authData).length > 0
          ? `Hi ${trimText(authData.name, 10)}`
          : 'Account',
      children: [
        {
          name: 'Profile',
          url: '/profile',
        },
        {
          name: 'Address',
          url: '/address',
        },
      ],
    },
    {
      name: 'Orders',
      url: '/',
    },
  ];
};

export default menusData;
