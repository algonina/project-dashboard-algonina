import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Navdata = () => {
  const history = useHistory();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [menuActivate, setMenuActivate] = useState(0);
  const [menus, setMenus] = useState([]);
  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));

  useEffect(() => {
    if (Object.keys(dataProfile).length > 0) {
      const { permission_menu } = dataProfile;
      let parents = permission_menu
        .filter((menu) => menu.menu_parent === '0')
        .map((item) => ({
          ...item,
          id: item.menu_id,
          label: item.menu_name,
          icon: item.menu_icon,
          link: item.menu_link,
          isHeader: item.is_header === '1',
          stateVariables: item.menu_id === menuActivate,
          click: function (e) {
            e.preventDefault();
            setMenuActivate(item.menu_id === menuActivate ? 0 : item.menu_id);
          },
          subItems: permission_menu
            .filter((men) => parseInt(men.menu_parent) === item.menu_id)
            .map((it) => ({
              id: it.menu_id,
              label: it.menu_name,
              link: it.menu_link,
              parentId: item.menu_id,
            })),
        }));

      setMenus(parents);
    }
  }, [dataProfile, menuActivate]);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState('Dashboard');

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute('subitems')) {
      const ul = document.getElementById('two-column-menu');
      const iconItems = ul.querySelectorAll('.nav-icon.active');
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove('active');
        var id = item.getAttribute('subitems');
        if (document.getElementById(id)) document.getElementById(id).classList.remove('show');
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove('twocolumn-panel');
    if (iscurrentState !== 'Dashboard') {
      setIsDashboard(false);
    }

    if (iscurrentState !== 'Landing') {
      setIsLanding(false);
    }
  }, [history, iscurrentState, isDashboard]);

  const menuItems = [
    {
      label: 'Menu',
      isHeader: true,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'mdi mdi-speedometer',
      link: '/dashboard',
      click: function (e) {
        e.preventDefault();
        setIscurrentState('Dashboard');
      },
    },
    {
      id: 'my-room',
      label: 'My Room',
      icon: 'mdi mdi-google-classroom',
      link: '/dashboard',
      click: function (e) {
        e.preventDefault();
        setIscurrentState('Dashboard');
      },
    },
    {
      id: 'my-member',
      label: 'My Member',
      icon: 'mdi mdi-table-account',
      link: '/dashboard',
      click: function (e) {
        e.preventDefault();
        setIscurrentState('Dashboard');
      },
    },
    {
      label: 'Manage',
      isHeader: true,
    },
    {
      id: 'manage-user',
      label: 'Users',
      icon: 'mdi mdi-book-account',
      link: '/users',
      click: function (e) {
        e.preventDefault();
        setIscurrentState('Dashboard');
      },
    },
    {
      id: 'manage-typeuser',
      label: "User Type's",
      icon: 'mdi mdi-account-group-outline',
      link: '/typeuser',
      click: function (e) {
        e.preventDefault();
        setIscurrentState('Dashboard');
      },
    },
    {
      id: 'setting',
      label: 'Misc',
      icon: 'mdi mdi-cog',
      link: '/#',
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState('Dashboard');
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: 'analytics',
          label: 'Menu',
          link: '/menu',
          parentId: 'dashboard',
        },
        {
          id: 'modul',
          label: 'Modul',
          link: '/modul',
          parentId: 'dashboard',
        },
        {
          id: 'crm',
          label: 'Setting',
          link: '/settings',
          parentId: 'dashboard',
        },
        {
          id: 'crm',
          label: 'Type Setting',
          link: '/typesetting',
          parentId: 'dashboard',
        },
      ],
    },
    {
      label: 'Account',
      isHeader: true,
    },
    {
      id: 'my-account',
      label: 'My Account',
      icon: 'mdi mdi-account-circle',
      link: '/profile',
      click: function (e) {
        e.preventDefault();
        setIscurrentState('Profile');
      },
    },
    {
      id: 'my-account',
      label: 'Logout',
      icon: 'mdi mdi-logout',
      link: '/dashboard',
      click: function (e) {
        e.preventDefault();
        setIscurrentState('Dashboard');
      },
    },
  ];
  return <React.Fragment>{menus}</React.Fragment>;
};
export default Navdata;
