import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Update from "../pages/update/Update";
import Friends from "../pages/friends/Friends";

import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import NoSidebar from "../layouts/NoSidebar/NoSidebar";
const publicRoute = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.register, component: Register, layout: null },
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.profile, component: Profile, layout: NoSidebar },
  { path: config.routes.update, component: Update, layout: NoSidebar },
  { path: config.routes.friends, component: Friends, layout: NoSidebar },
];

export { publicRoute };
