import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Layout from "./Layout";
import AuthForm from "./AuthForm";

export default function SignUpPage() {

    const navigate = useNavigate();

    const handleSignUp = (username: string, password: string) => {
        axios
            .post("/api/user", {username, password})
            .then(() => {
                navigate("/sign-in");
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    };

    return (
        <Layout>
            <AuthForm
                title="Sign Up"
                buttonText="Sign Up"
                onSubmit={handleSignUp}/>
        </Layout>
    );
}