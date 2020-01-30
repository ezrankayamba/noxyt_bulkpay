import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import ClientsIndexPage from "./pages/clients/ClientsIndexPage";
import PaymentsIndexPage from "./pages/payments/PaymentsIndexPage";
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BusinessIcon from '@material-ui/icons/Business';
import PaymentIcon from '@material-ui/icons/Payment';
import React from "react";

const getMenus = (loggedIn) => {
    let icons = {
        home: <HomeIcon/>,
        login:<ExitToAppIcon/>,
        logout:<ExitToAppIcon/>,
        clients: <BusinessIcon/>,
        payments: <PaymentIcon/>,
    }
    let menus = loggedIn ?
        [
            {id: 1, path: "/", name: "Home", component: HomePage, mIcon: icons.home},
            {id: 2, path: "/clients", name: "Clients", component: ClientsIndexPage, mIcon: icons.clients},
            {id: 3, path: "/payments", name: "Payments", component: PaymentsIndexPage, mIcon: icons.payments},
            {id: 4, path: "/logout", name: "Logout", component: LogoutPage, mIcon: icons.logout},
        ] : [
            {id: 1, path: "/", name: "Home", component: HomePage, mIcon: icons.home},
            {id: 2, path: "/login", name: "Login", component: LoginPage, mIcon: icons.login}
        ]
    return menus;
}
export default getMenus;