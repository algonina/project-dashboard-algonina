import React from 'react';
import { Redirect } from 'react-router-dom';

//Dashboard
// import DashboardAnalytics from '../../vendor/pages/DashboardAnalytics';
import DashboardPage from '../pages/Dashboard';
// import DashboardEcommerce from '../../vendor/pages/DashboardEcommerce';

// import DashboardCrypto from '../../vendor/pages/DashboardCrypto';
// import DashboardProject from '../../vendor/pages/DashboardProject';
// import DashboardNFT from '../../vendor/pages/DashboardNFT';

// //Calendar
// // Email box
// import MailInbox from '../../vendor/pages/EmailInbox';
// import BasicAction from '../../vendor/pages/Email/EmailTemplates/BasicAction';
// import EcommerceAction from '../../vendor/pages/Email/EmailTemplates/EcommerceAction';

// //CHat
// import Chat from '../../vendor/pages/Chat';
// import Calendar from '../../vendor/pages/Calendar';

// // Project
// import ProjectList from '../../vendor/pages/Projects/ProjectList';
// import ProjectOverview from '../../vendor/pages/Projects/ProjectOverview';
// import CreateProject from '../../vendor/pages/Projects/CreateProject';

// //Task
// import TaskDetails from '../../vendor/pages/Tasks/TaskDetails';
// import TaskList from '../../vendor/pages/Tasks/TaskList';
// import KanbanBoard from '../../vendor/pages/Tasks/KanbanBoard/Index';

// //Transactions
// import Transactions from '../../vendor/pages/Crypto/Transactions';
// import BuySell from '../../vendor/pages/Crypto/BuySell';
// import CryproOrder from '../../vendor/pages/Crypto/CryptoOrder';
// import MyWallet from '../../vendor/pages/Crypto/MyWallet';
// import ICOList from '../../vendor/pages/Crypto/ICOList';
// import KYCVerification from '../../vendor/pages/Crypto/KYCVerification';

// //Crm Pages
// import CrmCompanies from '../../vendor/pages/Crm/CrmCompanies';
// import CrmContacts from '../../vendor/pages/Crm/CrmContacts';
// import CrmDeals from '../../vendor/pages/Crm/CrmDeals/index';
// import CrmLeads from '../../vendor/pages/Crm/CrmLeads/index';

// //Invoices
// import InvoiceList from '../../vendor/pages/Invoices/InvoiceList';
// import InvoiceCreate from '../../vendor/pages/Invoices/InvoiceCreate';
// import InvoiceDetails from '../../vendor/pages/Invoices/InvoiceDetails';

// // Support Tickets
// import ListView from '../../vendor/pages/SupportTickets/ListView';
// import TicketsDetails from '../../vendor/pages/SupportTickets/TicketsDetails';

// // //Ecommerce Pages
// import EcommerceProducts from '../../vendor/pages/Ecommerce/EcommerceProducts/index';
// import EcommerceProductDetail from '../../vendor/pages/Ecommerce/EcommerceProducts/EcommerceProductDetail';
// import EcommerceAddProduct from '../../vendor/pages/Ecommerce/EcommerceProducts/EcommerceAddProduct';
// import EcommerceOrders from '../../vendor/pages/Ecommerce/EcommerceOrders/index';
// import EcommerceOrderDetail from '../../vendor/pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail';
// import EcommerceCustomers from '../../vendor/pages/Ecommerce/EcommerceCustomers/index';
// import EcommerceCart from '../../vendor/pages/Ecommerce/EcommerceCart';
// import EcommerceCheckout from '../../vendor/pages/Ecommerce/EcommerceCheckout';
// import EcommerceSellers from '../../vendor/pages/Ecommerce/EcommerceSellers/index';
// import EcommerceSellerDetail from '../../vendor/pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail';

// // NFT Marketplace Pages
// import Marketplace from '../../vendor/pages/NFTMarketplace/Marketplace';
// import Collections from '../../vendor/pages/NFTMarketplace/Collections';
// import CreateNFT from '../../vendor/pages/NFTMarketplace/CreateNFT';
// import Creators from '../../vendor/pages/NFTMarketplace/Creators';
// import ExploreNow from '../../vendor/pages/NFTMarketplace/ExploreNow';
// import ItemDetails from '../../vendor/pages/NFTMarketplace/Itemdetails';
// import LiveAuction from '../../vendor/pages/NFTMarketplace/LiveAuction';
// import Ranking from '../../vendor/pages/NFTMarketplace/Ranking';
// import WalletConnect from '../../vendor/pages/NFTMarketplace/WalletConnect';

// // Base Ui
// import UiAlerts from '../../vendor/pages/BaseUi/UiAlerts/UiAlerts';
// import UiBadges from '../../vendor/pages/BaseUi/UiBadges/UiBadges';
// import UiButtons from '../../vendor/pages/BaseUi/UiButtons/UiButtons';
// import UiColors from '../../vendor/pages/BaseUi/UiColors/UiColors';
// import UiCards from '../../vendor/pages/BaseUi/UiCards/UiCards';
// import UiCarousel from '../../vendor/pages/BaseUi/UiCarousel/UiCarousel';
// import UiDropdowns from '../../vendor/pages/BaseUi/UiDropdowns/UiDropdowns';
// import UiGrid from '../../vendor/pages/BaseUi/UiGrid/UiGrid';
// import UiImages from '../../vendor/pages/BaseUi/UiImages/UiImages';
// import UiTabs from '../../vendor/pages/BaseUi/UiTabs/UiTabs';
// import UiAccordions from '../../vendor/pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse';
// import UiModals from '../../vendor/pages/BaseUi/UiModals/UiModals';
// import UiOffcanvas from '../../vendor/pages/BaseUi/UiOffcanvas/UiOffcanvas';
// import UiPlaceholders from '../../vendor/pages/BaseUi/UiPlaceholders/UiPlaceholders';
// import UiProgress from '../../vendor/pages/BaseUi/UiProgress/UiProgress';
// import UiNotifications from '../../vendor/pages/BaseUi/UiNotifications/UiNotifications';
// import UiMediaobject from '../../vendor/pages/BaseUi/UiMediaobject/UiMediaobject';
// import UiEmbedVideo from '../../vendor/pages/BaseUi/UiEmbedVideo/UiEmbedVideo';
// import UiTypography from '../../vendor/pages/BaseUi/UiTypography/UiTypography';
// import UiList from '../../vendor/pages/BaseUi/UiLists/UiLists';
// import UiGeneral from '../../vendor/pages/BaseUi/UiGeneral/UiGeneral';
// import UiRibbons from '../../vendor/pages/BaseUi/UiRibbons/UiRibbons';
// import UiUtilities from '../../vendor/pages/BaseUi/UiUtilities/UiUtilities';

// // Advance Ui
// import UiNestableList from '../../vendor/pages/AdvanceUi/UiNestableList/UiNestableList';
// import UiScrollbar from '../../vendor/pages/AdvanceUi/UiScrollbar/UiScrollbar';
// import UiAnimation from '../../vendor/pages/AdvanceUi/UiAnimation/UiAnimation';
// import UiTour from '../../vendor/pages/AdvanceUi/UiTour/UiTour';
// import UiSwiperSlider from '../../vendor/pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider';
// import UiRatings from '../../vendor/pages/AdvanceUi/UiRatings/UiRatings';
// import UiHighlight from '../../vendor/pages/AdvanceUi/UiHighlight/UiHighlight';

// // Widgets
// import Widgets from '../../vendor/pages/Widgets/Index';

// //Forms
// import BasicElements from '../../vendor/pages/Forms/BasicElements/BasicElements';
// import FormSelect from '../../vendor/pages/Forms/FormSelect/FormSelect';
// import FormEditor from '../../vendor/pages/Forms/FormEditor/FormEditor';
// import CheckBoxAndRadio from '../../vendor/pages/Forms/CheckboxAndRadio/CheckBoxAndRadio';
// import Masks from '../../vendor/pages/Forms/Masks/Masks';
// import FileUpload from '../../vendor/pages/Forms/FileUpload/FileUpload';
// import FormPickers from '../../vendor/pages/Forms/FormPickers/FormPickers';
// import FormRangeSlider from '../../vendor/pages/Forms/FormRangeSlider/FormRangeSlider';
// import Formlayouts from '../../vendor/pages/Forms/FormLayouts/Formlayouts';
// import FormValidation from '../../vendor/pages/Forms/FormValidation/FormValidation';
// import FormWizard from '../../vendor/pages/Forms/FormWizard/FormWizard';
// import FormAdvanced from '../../vendor/pages/Forms/FormAdvanced/FormAdvanced';
// import Select2 from '../../vendor/pages/Forms/Select2/Select2';

// //Tables
import BasicTables from '../../vendor/pages/Tables/BasicTables/BasicTables';
// import GridTables from '../../vendor/pages/Tables/GridTables/GridTables';
// import ListTables from '../../vendor/pages/Tables/ListTables/ListTables';
import DataTables from '../../vendor/pages/Tables/DataTables/DataTables';

// //Icon pages
// import RemixIcons from '../../vendor/pages/Icons/RemixIcons/RemixIcons';
// import BoxIcons from '../../vendor/pages/Icons/BoxIcons/BoxIcons';
// import MaterialDesign from '../../vendor/pages/Icons/MaterialDesign/MaterialDesign';
// import FeatherIcons from '../../vendor/pages/Icons/FeatherIcons/FeatherIcons';
// import LineAwesomeIcons from '../../vendor/pages/Icons/LineAwesomeIcons/LineAwesomeIcons';

// //Maps
// import GoogleMaps from '../../vendor/pages/Maps/GoogleMaps/GoogleMaps';
// import VectorMaps from '../../vendor/pages/Maps/VectorMaps/VectorMaps';
// import LeafletMaps from '../../vendor/pages/Maps/LeafletMaps/LeafletMaps';

// //AuthenticationInner pages
import BasicSignIn from '../pages/Authentication/Login';
// import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
// import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
// import CoverSignUp from '../pages/AuthenticationInner/Register/CoverSignUp';
// import BasicPasswReset from '../../vendor/pages/AuthenticationInner/PasswordReset/BasicPasswReset';
// //pages
// import Starter from '../../vendor/pages/Pages/Starter/Starter';
// import SimplePage from '../../vendor/pages/Pages/Profile/SimplePage/SimplePage';
// import Settings from '../../vendor/pages/Pages/Profile/Settings/Settings';
// import Team from '../../vendor/pages/Pages/Team/Team';
// import Timeline from '../../vendor/pages/Pages/Timeline/Timeline';
// import Faqs from '../../vendor/pages/Pages/Faqs/Faqs';
// import Pricing from '../../vendor/pages/Pages/Pricing/Pricing';
// import Gallery from '../../vendor/pages/Pages/Gallery/Gallery';
// import Maintenance from '../../vendor/pages/Pages/Maintenance/Maintenance';
// import ComingSoon from '../../vendor/pages/Pages/ComingSoon/ComingSoon';
// import SiteMap from '../../vendor/pages/Pages/SiteMap/SiteMap';
// import SearchResults from '../../vendor/pages/Pages/SearchResults/SearchResults';

// import CoverPasswReset from '../../vendor/pages/AuthenticationInner/PasswordReset/CoverPasswReset';
// import BasicLockScreen from '../../vendor/pages/AuthenticationInner/LockScreen/BasicLockScr';
// import CoverLockScreen from '../../vendor/pages/AuthenticationInner/LockScreen/CoverLockScr';
// import BasicLogout from '../../vendor/pages/AuthenticationInner/Logout/BasicLogout';
// import CoverLogout from '../../vendor/pages/AuthenticationInner/Logout/CoverLogout';
// import BasicSuccessMsg from '../../vendor/pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
// import CoverSuccessMsg from '../../vendor/pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
// import BasicTwosVerify from '../../vendor/pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
// import CoverTwosVerify from '../../vendor/pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
// import Basic404 from '../../vendor/pages/AuthenticationInner/Errors/Basic404';
// import Cover404 from '../../vendor/pages/AuthenticationInner/Errors/Cover404';
// import Alt404 from '../../vendor/pages/AuthenticationInner/Errors/Alt404';
// import Error500 from '../../vendor/pages/AuthenticationInner/Errors/Error500';

// import BasicPasswCreate from '../../vendor/pages/AuthenticationInner/PasswordCreate/BasicPasswCreate';
// import CoverPasswCreate from '../../vendor/pages/AuthenticationInner/PasswordCreate/CoverPasswCreate';
// import Offlinepage from '../../vendor/pages/AuthenticationInner/Errors/Offlinepage';

// //login
import Login from '../pages/Authentication/Login';
// import ForgetPasswordPage from '../../vendor/pages/Authentication/ForgetPassword';
// import Logout from '../../vendor/pages/Authentication/Logout';
// import Register from '../../vendor/pages/Authentication/Register';

// //Charts
// import LineCharts from '../../vendor/pages/Charts/ApexCharts/LineCharts';
// import AreaCharts from '../../vendor/pages/Charts/ApexCharts/AreaCharts';
// import ColumnCharts from '../../vendor/pages/Charts/ApexCharts/ColumnCharts';
// import BarCharts from '../../vendor/pages/Charts/ApexCharts/BarCharts';
// import MixedCharts from '../../vendor/pages/Charts/ApexCharts/MixedCharts';
// import TimelineCharts from '../../vendor/pages/Charts/ApexCharts/TimelineCharts';
// import CandlestickChart from '../../vendor/pages/Charts/ApexCharts/CandlestickChart';
// import BoxplotCharts from '../../vendor/pages/Charts/ApexCharts/BoxplotCharts';
// import BubbleChart from '../../vendor/pages/Charts/ApexCharts/BubbleChart';
// import ScatterCharts from '../../vendor/pages/Charts/ApexCharts/ScatterCharts';
// import HeatmapCharts from '../../vendor/pages/Charts/ApexCharts/HeatmapCharts';
// import TreemapCharts from '../../vendor/pages/Charts/ApexCharts/TreemapCharts';
// import PieCharts from '../../vendor/pages/Charts/ApexCharts/PieCharts';
// import RadialbarCharts from '../../vendor/pages/Charts/ApexCharts/RadialbarCharts';
// import RadarCharts from '../../vendor/pages/Charts/ApexCharts/RadarCharts';
// import PolarCharts from '../../vendor/pages/Charts/ApexCharts/PolarCharts';

// import ChartsJs from '../../vendor/pages/Charts/ChartsJs/index';
// import Echarts from '../../vendor/pages/Charts/ECharts/index';

// // Landing Index
// import OnePage from '../../vendor/pages/Landing/OnePage';
// import NFTLanding from '../../vendor/pages/Landing/NFTLanding';

// // User Profile
// import UserProfile from '../../vendor/pages/Authentication/user-profile';
import { ownroutes } from './ownRoutes';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';

const routes = [
  // { path: '/dashboard-analytics', component: DashboardAnalytics },
  // { path: '/dashboard-crm', component: DashboardPage },
  { path: '/dashboard', component: DashboardPage },
  // { path: '/index', component: DashboardEcommerce },
  // { path: '/dashboard-crypto', component: DashboardCrypto },
  // { path: '/dashboard-projects', component: DashboardProject },
  // { path: '/dashboard-nft', component: DashboardNFT },
  // { path: '/apps-calendar', component: Calendar },
  // { path: '/apps-ecommerce-products', component: EcommerceProducts },
  // { path: '/apps-ecommerce-product-details', component: EcommerceProductDetail },
  // { path: '/apps-ecommerce-add-product', component: EcommerceAddProduct },
  // { path: '/apps-ecommerce-orders', component: EcommerceOrders },
  // { path: '/apps-ecommerce-order-details', component: EcommerceOrderDetail },
  // { path: '/apps-ecommerce-customers', component: EcommerceCustomers },
  // { path: '/apps-ecommerce-cart', component: EcommerceCart },
  // { path: '/apps-ecommerce-checkout', component: EcommerceCheckout },
  // { path: '/apps-ecommerce-sellers', component: EcommerceSellers },
  // { path: '/apps-ecommerce-seller-details', component: EcommerceSellerDetail },

  // //Chat
  // { path: '/apps-chat', component: Chat },

  // //EMail
  // { path: '/apps-mailbox', component: MailInbox },
  // { path: '/apps-email-basic', component: BasicAction },
  // { path: '/apps-email-ecommerce', component: EcommerceAction },

  // //Projects
  // { path: '/apps-projects-list', component: ProjectList },
  // { path: '/apps-projects-overview', component: ProjectOverview },
  // { path: '/apps-projects-create', component: CreateProject },

  // //Task
  // { path: '/apps-tasks-list-view', component: TaskList },
  // { path: '/apps-tasks-details', component: TaskDetails },
  // { path: '/apps-tasks-kanban', component: KanbanBoard },
  // //Crm
  // { path: '/apps-crm-contacts', component: CrmContacts },
  // { path: '/apps-crm-companies', component: CrmCompanies },
  // { path: '/apps-crm-deals', component: CrmDeals },
  // { path: '/apps-crm-leads', component: CrmLeads },

  // //Invoices
  // { path: '/apps-invoices-list', component: InvoiceList },
  // { path: '/apps-invoices-details', component: InvoiceDetails },
  // { path: '/apps-invoices-create', component: InvoiceCreate },

  // //Supports Tickets
  // { path: '/apps-tickets-list', component: ListView },
  // { path: '/apps-tickets-details', component: TicketsDetails },

  // //transactions
  // { path: '/apps-crypto-transactions', component: Transactions },
  // { path: '/apps-crypto-buy-sell', component: BuySell },
  // { path: '/apps-crypto-orders', component: CryproOrder },
  // { path: '/apps-crypto-wallet', component: MyWallet },
  // { path: '/apps-crypto-ico', component: ICOList },
  // { path: '/apps-crypto-kyc', component: KYCVerification },

  // // NFT Marketplace
  // { path: '/apps-nft-marketplace', component: Marketplace },
  // { path: '/apps-nft-collections', component: Collections },
  // { path: '/apps-nft-create', component: CreateNFT },
  // { path: '/apps-nft-creators', component: Creators },
  // { path: '/apps-nft-explore', component: ExploreNow },
  // { path: '/apps-nft-item-details', component: ItemDetails },
  // { path: '/apps-nft-auction', component: LiveAuction },
  // { path: '/apps-nft-ranking', component: Ranking },
  // { path: '/apps-nft-wallet', component: WalletConnect },

  // //charts
  // { path: '/charts-apex-line', component: LineCharts },
  // { path: '/charts-apex-area', component: AreaCharts },
  // { path: '/charts-apex-column', component: ColumnCharts },
  // { path: '/charts-apex-bar', component: BarCharts },
  // { path: '/charts-apex-mixed', component: MixedCharts },
  // { path: '/charts-apex-timeline', component: TimelineCharts },
  // { path: '/charts-apex-candlestick', component: CandlestickChart },
  // { path: '/charts-apex-boxplot', component: BoxplotCharts },
  // { path: '/charts-apex-bubble', component: BubbleChart },
  // { path: '/charts-apex-scatter', component: ScatterCharts },
  // { path: '/charts-apex-heatmap', component: HeatmapCharts },
  // { path: '/charts-apex-treemap', component: TreemapCharts },
  // { path: '/charts-apex-pie', component: PieCharts },
  // { path: '/charts-apex-radialbar', component: RadialbarCharts },
  // { path: '/charts-apex-radar', component: RadarCharts },
  // { path: '/charts-apex-polar', component: PolarCharts },

  // { path: '/charts-chartjs', component: ChartsJs },
  // { path: '/charts-echarts', component: Echarts },

  // // Base Ui
  // { path: '/ui-alerts', component: UiAlerts },
  // { path: '/ui-badges', component: UiBadges },
  // { path: '/ui-buttons', component: UiButtons },
  // { path: '/ui-colors', component: UiColors },
  // { path: '/ui-cards', component: UiCards },
  // { path: '/ui-carousel', component: UiCarousel },
  // { path: '/ui-dropdowns', component: UiDropdowns },
  // { path: '/ui-grid', component: UiGrid },
  // { path: '/ui-images', component: UiImages },
  // { path: '/ui-tabs', component: UiTabs },
  // { path: '/ui-accordions', component: UiAccordions },
  // { path: '/ui-modals', component: UiModals },
  // { path: '/ui-offcanvas', component: UiOffcanvas },
  // { path: '/ui-placeholders', component: UiPlaceholders },
  // { path: '/ui-progress', component: UiProgress },
  // { path: '/ui-notifications', component: UiNotifications },
  // { path: '/ui-media', component: UiMediaobject },
  // { path: '/ui-embed-video', component: UiEmbedVideo },
  // { path: '/ui-typography', component: UiTypography },
  // { path: '/ui-lists', component: UiList },
  // { path: '/ui-general', component: UiGeneral },
  // { path: '/ui-ribbons', component: UiRibbons },
  // { path: '/ui-utilities', component: UiUtilities },

  // // Advance Ui
  // { path: '/advance-ui-nestable', component: UiNestableList },
  // { path: '/advance-ui-scrollbar', component: UiScrollbar },
  // { path: '/advance-ui-animation', component: UiAnimation },
  // { path: '/advance-ui-tour', component: UiTour },
  // { path: '/advance-ui-swiper', component: UiSwiperSlider },
  // { path: '/advance-ui-ratings', component: UiRatings },
  // { path: '/advance-ui-highlight', component: UiHighlight },

  // // Widgets
  // { path: '/widgets', component: Widgets },

  // Forms
  // { path: '/forms-elements', component: BasicElements },
  // { path: '/forms-select', component: FormSelect },
  // { path: '/forms-editors', component: FormEditor },
  // { path: '/forms-checkboxes-radios', component: CheckBoxAndRadio },
  // { path: '/forms-masks', component: Masks },
  // { path: '/forms-file-uploads', component: FileUpload },
  // { path: '/forms-pickers', component: FormPickers },
  // { path: '/forms-range-sliders', component: FormRangeSlider },
  // { path: '/forms-layouts', component: Formlayouts },
  // { path: '/forms-validation', component: FormValidation },
  // { path: '/forms-wizard', component: FormWizard },
  // { path: '/forms-advanced', component: FormAdvanced },
  // { path: '/forms-select2', component: Select2 },

  //Tables
  { path: '/tables-basic', component: BasicTables },
  // { path: '/tables-gridjs', component: GridTables },
  // { path: '/tables-listjs', component: ListTables },
  { path: '/tables-datatables', component: DataTables },

  //Icons
  // { path: '/icons-remix', component: RemixIcons },
  // { path: '/icons-boxicons', component: BoxIcons },
  // { path: '/icons-materialdesign', component: MaterialDesign },
  // { path: '/icons-feather', component: FeatherIcons },
  // { path: '/icons-lineawesome', component: LineAwesomeIcons },

  //Maps
  // { path: '/maps-google', component: GoogleMaps },
  // { path: '/maps-vector', component: VectorMaps },
  // { path: '/maps-leaflet', component: LeafletMaps },

  //Pages
  // { path: '/pages-starter', component: Starter },
  // { path: '/pages-profile', component: SimplePage },
  // { path: '/pages-profile-settings', component: Settings },
  // { path: '/pages-team', component: Team },
  // { path: '/pages-timeline', component: Timeline },
  // { path: '/pages-faqs', component: Faqs },
  // { path: '/pages-gallery', component: Gallery },
  // { path: '/pages-pricing', component: Pricing },
  // { path: '/pages-sitemap', component: SiteMap },
  // { path: '/pages-search-results', component: SearchResults },

  //User Profile

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: '/',
    exact: true,
    component: () => (
      <>
        <Redirect to='/dashboard' />
      </>
    ),
  },
  // { path: '*', component: Alt404, exact: true },
];

const publicRoutes = [
  // Authentication Page
  // { path: '/logout', component: Logout },
  // { path: '/loginn', component: Login },
  { path: '/', component: Login },
  // { path: '/forgot-password', component: ForgetPasswordPage },
  // { path: '/ui/register', component: Register },
  // { path: '/register', component: CoverSignUp },

  //AuthenticationInner pages
  { path: '/auth-signin-basic', component: BasicSignIn },
  // { path: '/auth-signin-cover', component: CoverSignIn },
  // { path: '/auth-signup-basic', component: BasicSignUp },
  // { path: '/auth-signup-cover', component: CoverSignUp },
  // { path: '/auth-pass-reset-basic', component: BasicPasswReset },
  // { path: '/auth-pass-reset-cover', component: CoverPasswReset },
  // { path: '/auth-lockscreen-basic', component: BasicLockScreen },
  // { path: '/auth-lockscreen-cover', component: CoverLockScreen },
  // { path: '/auth-logout-basic', component: BasicLogout },
  // { path: '/auth-logout-cover', component: CoverLogout },
  // { path: '/auth-success-msg-basic', component: BasicSuccessMsg },
  // { path: '/auth-success-msg-cover', component: CoverSuccessMsg },
  // { path: '/auth-twostep-basic', component: BasicTwosVerify },
  // { path: '/auth-twostep-cover', component: CoverTwosVerify },
  // { path: '/auth-404-basic', component: Basic404 },
  // { path: '/auth-404-cover', component: Cover404 },
  // { path: '/auth-404-alt', component: Alt404 },
  // { path: '/auth-500', component: Error500 },
  // { path: '/pages-maintenance', component: Maintenance },
  // { path: '/pages-coming-soon', component: ComingSoon },

  // { path: '/landing', component: OnePage },
  // { path: '/nft-landing', component: NFTLanding },

  // { path: '/auth-pass-change-basic', component: BasicPasswCreate },
  // { path: '/auth-pass-change-cover', component: CoverPasswCreate },
  // { path: '/auth-offline', component: Offlinepage },
];

let authProtectedRoutes = routes.concat(ownroutes);

export { authProtectedRoutes, publicRoutes };
