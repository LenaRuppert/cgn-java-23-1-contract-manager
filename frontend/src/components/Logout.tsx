import useAuth from "../hooks/useAuth";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function Logout() {
    const user = useAuth(false);
    const location = useLocation();

    return user && (
        <button onClick={() => {
            axios.post("/api/user/logout").then(() => {
                window.sessionStorage.setItem(
                    "signInRedirect",
                    location.pathname || "/"
                );
                window.location.href = "/sign-in";
            });
        }}>Logout </button>)
}