import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

export type User = {
    id: string;
    username: string;
    role: string;
};

type AuthState = {
    user?: User;
    isLoading: boolean;
};

export default function useAuth(redirectToSignIn?: boolean) {
    const [authState, setAuthState] = useState<AuthState>({
        user: undefined,
        isLoading: true,
    });
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        axios
            .get("/api/user/me")
            .then((res) => {
                setAuthState({user: res.data, isLoading: false});
            })
            .catch((e) => {
                if (redirectToSignIn && e.response.status === 401) {
                    window.sessionStorage.setItem("signInRedirect", pathname || "/");
                    navigate("/login");
                } else {
                    setAuthState({user: undefined, isLoading: false});
                }
            });
    }, [pathname, navigate, redirectToSignIn]);

    return authState;
}




