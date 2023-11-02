import { combineReducers } from 'redux';
import {
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Calendar,
  chat,
  Projects,
  Ecommerce,
  Tasks,
  changeNumber,
  Crypto,
  Tickets,
  Crm,
  Invoice,
  Mailbox,
  DashboardAnalytics,
  DashboardCRM,
  DashboardEcommerce,
  DashboardCrypto,
  DashboardProject,
  DashboardNFT,
  Team,
} from '../../vendor/store/reducers';

import { modals } from './Modal';

import { modulTypeuser } from './Typeuser';

import { modulUser } from './User';
import { modulTypeSetting, modulSetting } from './Setting';

import { modulSchema, modulMenu } from './Schema';

import { modulPermissionMenu, modulPermissionSchema } from './Permission';
import { modulProfile } from './Profile';
import { modulAuth, modulLogout } from './Auth';
import { modulMyaccount } from './Myaccount';

// outside of system
import { modulRoom, modulCategoryRoom } from './Room';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Calendar,
  chat,
  Projects,
  Ecommerce,
  Tasks,
  changeNumber,
  Crypto,
  Tickets,
  Crm,
  Invoice,
  Mailbox,
  DashboardAnalytics,
  DashboardCRM,
  DashboardEcommerce,
  DashboardCrypto,
  DashboardProject,
  DashboardNFT,
  Team,

  // own reducer
  modals,
  modulTypeuser,
  modulUser,
  modulTypeSetting,
  modulSchema,
  modulSetting,
  modulMenu,
  modulPermissionMenu,
  modulPermissionSchema,
  modulProfile,
  modulAuth,
  modulMyaccount,
  modulLogout,

  // Outside of system
  modulCategoryRoom,
  modulRoom,
});

export default rootReducer;
