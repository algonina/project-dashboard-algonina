import TypeuserPage from '../pages/typeuser/IndexPage';

import UserPage from '../pages/User/IndexPage';
import DetailTypeuserPage from '../pages/typeuser/DetailPage';

import TypeSettingPage from '../pages/TypeSetting/IndexPage';

import SchemaPage from '../pages/Schema/IndexPage';
import SettingPage from '../pages/Setting/IndexPage';
import MenuPage from '../pages/Menu/IndexPage';

import ProfilePage from '../pages/Profile/ProfilePage';
import ContentPage from '../pages/Content/ContentPage';
import DetailRoom from '../pages/Room/DetailRoom';

// outside of system

import CategoryPage from '../pages/CategoryRoom/IndexPage';

const ownroutes = [
  { path: '/typeuser', component: TypeuserPage },
  { path: '/users', component: UserPage },
  { path: '/typesetting', component: TypeSettingPage },
  { path: '/typeuser/:id/', component: DetailTypeuserPage },
  { path: '/modul', component: SchemaPage },
  { path: '/settings', component: SettingPage },
  { path: '/menu', component: MenuPage },
  { path: '/profile', component: ProfilePage },
  { path: '/content', component: ContentPage },

  // outside of system
  { path: '/category', component: CategoryPage },
  { path: '/room/:slug/:id', component: DetailRoom },
  { path: '/room/:slug/:id/:contentid', component: DetailRoom },
];

export { ownroutes };
