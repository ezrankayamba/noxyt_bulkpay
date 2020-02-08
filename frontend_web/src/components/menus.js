import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import ClientsIndexPage from "./pages/clients/ClientsIndexPage";
import PaymentsIndexPage from "./pages/payments/PaymentsIndexPage";
import React from "react";

const getMenus = (loggedIn, privileges) => {
    let pFilter = (m) => {
        return m.privilege === 'Anonymous' || (loggedIn && privileges.includes(m.privilege))
    }
    let menus = loggedIn ?
        [
            {id: 1, path: "/", name: "Home", component: HomePage, privilege: 'Anonymous'},
            {
                id: 2,
                path: "/clients",
                name: "Clients",
                component: ClientsIndexPage,
                privilege: 'BackOffice.viewClients'
            },
            {
                id: 3,
                path: "/payments",
                name: "Payments",
                component: PaymentsIndexPage,
                privilege: 'Payments.viewPayments'
            },
            {
                id: 4,
                path: "/logout",
                name: "Logout",
                component: LogoutPage,
                privilege: 'Anonymous'
            },
        ] : [
            {id: 1, path: "/", name: "Home", component: HomePage, privilege: 'Anonymous'},
            {id: 2, path: "/login", name: "Login", component: LoginPage, privilege: 'Anonymous'}
        ]
    return menus.filter(pFilter);
}
export default getMenus;