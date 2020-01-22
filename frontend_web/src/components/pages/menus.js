import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProtectedPage from "./ProtectedPage";
import {getAccessToken} from "../../redux/auth";
import LogoutPage from "./LogoutPage";

const getMenus = () => {
    let count = 0;
    let list = []
    let add = (params) => {
        list.push({id: ++count, ...params})
    }
    add({path: "/", name: "Home", component: HomePage, isPrivate: true, onLogin: true})
    add({path: "/protected", name: "Secured", component: ProtectedPage, isPrivate: true, onLogin: true})
    let token = getAccessToken()
    if (!token) {
        add({path: "/login", name: "Login", component: LoginPage})
        add({path: "/register", name: "Register", component: RegisterPage})
    } else {
        add({path: "/logout", name: "Logout", component: LogoutPage, onLogin: true, isLogout: true})
    }

    return list
}
export default getMenus;