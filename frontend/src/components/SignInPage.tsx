import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import AuthForm from "./AuthForm";


type SignInPageProps = {
    getAllClients: () => void;
}

export default function SignInPage(props: SignInPageProps) {
    const navigate = useNavigate();

    const handleSignIn = (username: string, password: string) => {
        const btoaString = `${username}:${password}`
        axios
            .post(
                "/api/user/login",
                {},
                {
                    headers: {Authorization: `Basic ${window.btoa(btoaString)}`}
                })
            .then(() => {
                const redirect =
                    window.sessionStorage.getItem("signInRedirect") || "/";
                window.sessionStorage.removeItem("signInRedirect");
                navigate(redirect);
                props.getAllClients();
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    };

    return (
        <Layout>
            <AuthForm
                title="Sign In"
                buttonText="Sign In"
                onSubmit={handleSignIn}/>
        </Layout>
    );
}