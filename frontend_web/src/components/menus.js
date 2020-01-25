import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import ClientsIndexPage from "./pages/clients/ClientsIndexPage";

const getMenus = (loggedIn) => {
    let menus = loggedIn ?
        [
            {id: 1, path: "/", name: "Home", component: HomePage},
            {id: 2, path: "/clients", name: "Clients", component: ClientsIndexPage},
            {id: 3, path: "/logout", name: "Logout", component: LogoutPage}
        ] : [
            {id: 1, path: "/", name: "Home", component: HomePage},
            {id: 2, path: "/login", name: "Login", component: LoginPage}
        ]
    return menus;
}
export default getMenus;