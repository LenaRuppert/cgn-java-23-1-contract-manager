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
    error?: string;
};

export default function useAuth(redirectToSignIn?: boolean): AuthState {
    const [authState, setAuthState] = useState<AuthState>({
        user: undefined,
        isLoading: true,
        error: undefined,
    });
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        axios
            .get("/api/user/me")
            .then((res) => {
                setAuthState({user: res.data, isLoading: false, error: undefined});
            })
            .catch((e) => {
                if (e.response?.status === 401) {
                    setAuthState({
                        user: undefined,
                        isLoading: false,
                        error: "Unauthorized",
                    });
                    if (redirectToSignIn) {
                        window.sessionStorage.setItem("signInRedirect", pathname || "/");
                        navigate("/login");
                    }
                } else {
                    setAuthState({
                        user: undefined,
                        isLoading: false,
                        error: e.response?.data?.message || "Login failed",
                    });
                }
            });
    }, [pathname, navigate, redirectToSignIn]);

    return authState;
}




