import Layout from '../layouts/Layout'
import LoginForm from '../pages/LoginForm';
import GuestHome from '../pages/GuestHome';
import StaffHome from '../pages/StaffHome';
import LightingManagement from '../pages/LightingManagement';
import DeviceForm from '../pages/DeviceForm';
import RoomIssues from '../pages/RoomIssues';
import RoomStatus from '../pages/RoomStatus';
import ACManagement from '../pages/ACManagement';
import IssueForm from '../pages/IssueForm';
import ShabbatClock from '../pages/ShabbatClock';

const routes = [
  {
    path: "/",
    component: LoginForm,
    exact: true,
    is_auth:false,
    name: "index"
  },
  {
    path: "/login",
    component: LoginForm,
    exact: true,
    is_auth:false,
    name: "login"
  },
  {
      path: "/guest_home",
      component: GuestHome,
      exact: true,
      is_auth:true,
      name: "guest_home",
      layout: Layout,
      footer: true
    },
    {
      path: "/staff_home",
      component: StaffHome,
      exact: true,
      is_auth:true,
      name: "staff_home",
      layout: Layout,
      footer: true
    },

    {
      path: "/lighting_management",
      component: LightingManagement,
      exact: true,
      is_auth:true,
      name: "lighting_management",
      layout: Layout,
      footer: true
    },
    {
      path: "/add_devices",
      component: DeviceForm,
      exact: true,
      is_auth:true,
      name: "add_devices",
      layout: Layout,
      footer: true
    },
    {
      path: "/room_issues",
      component: RoomIssues,
      exact: true,
      is_auth:true,
      name: "room_issues",
      layout: Layout,
      footer: true
    },
    {
      path: "/room_status",
      component: RoomStatus,
      exact: true,
      is_auth:true,
      name: "room_status",
      layout: Layout,
      footer: true
    },
    {
      path: "/ac_management",
      component: ACManagement,
      exact: true,
      is_auth:true,
      name: "ac_management",
      layout: Layout,
      footer: true
    },
    {
      path: "/add_issues",
      component: IssueForm,
      exact: true,
      is_auth:true,
      name: "add_issue",
      layout: Layout,
      footer: true
    },
    {
      path: "/shabbat_clock",
      component: ShabbatClock,
      exact: true,
      is_auth:true,
      name: "shabbat_clock",
      layout: Layout,
      footer: true
    }
];

export default routes;
