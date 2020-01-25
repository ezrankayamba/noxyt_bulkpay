import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import ProtectedPage from "./ProtectedPage";
import LogoutPage from "./LogoutPage";

const getMenus = (loggedIn) => {
    let menus = loggedIn ?
        [
            {id: 1, path: "/", name: "Home", component: HomePage},
            {id: 2, path: "/protected", name: "Protected", component: ProtectedPage},
            {id: 3, path: "/logout", name: "Logout", component: LogoutPage}
        ] : [
            {id: 1, path: "/", name: "Home", component: HomePage},
            {id: 2, path: "/login", name: "Login", component: LoginPage}
        ]
    return menus;
}
export default getMenus;