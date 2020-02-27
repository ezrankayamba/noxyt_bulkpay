import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import ClientsIndexPage from "./pages/clients/ClientsIndexPage";
import PaymentsIndexPage from "./pages/payments/PaymentsIndexPage";
import React from "react";
import {IconClient, IconHome, IconPayment, IconSignIn, IconSignOut} from "./utils/Incons";

const getMenus = (loggedIn, privileges) => {
    let pFilter = (m) => {
        return m.privilege === 'Anonymous' || (loggedIn && privileges.includes(m.privilege))
    }
    let menus = loggedIn ?
        [
            {id: 1, path: "/home", name: "Home", component: HomePage, Icon: 'ion-ios-home-outline', privilege: 'Anonymous'},
            {
                id: 2,
                path: "/clients",
                name: "Clients",
                component: ClientsIndexPage,
                Icon: "ion-ios-briefcase-outline",
                privilege: 'BackOffice.viewClients'
            },
            {
                id: 3,
                path: "/payments",
                name: "Payments",
                component: PaymentsIndexPage,
                Icon: "ion-card",
                privilege: 'Payments.viewPayments'
            },
            {
                id: 4,
                path: "/logout",
                name: "Logout",
                component: LogoutPage,
                Icon: "ion-power",
                privilege: 'Anonymous'
            },
        ] : [
            {id: 1, path: "/home", name: "Home", component: HomePage, Icon: 'ion-ios-home-outline', privilege: 'Anonymous'},
            {
                id: 2,
                path: "/login",
                name: "Login",
                component: LoginPage,
                Icon: "ion-power",
                privilege: 'Anonymous'
            }
        ]
    return menus.filter(pFilter);
}
export default getMenus;
