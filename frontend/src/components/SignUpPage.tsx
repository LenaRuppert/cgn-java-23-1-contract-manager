import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import {useNavigate} from "react-router-dom";
import Layout from "./Layout";


export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwörter stimmen nicht überein.");
            return;
        }

        axios
            .post("/api/user", {username, password})
            .then(() => {
                navigate(window.sessionStorage.getItem("signInRedirect") || "/");
            })
            .catch((error) =>
                setError(
                    error.response?.data?.message || "Registrierung fehlgeschlagen."
                )
            );
    }

    return (
        <>
            <Layout>
                <Container sx={{marginTop: 15}}>
                    <Box
                        component={"form"}
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            margin: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <ExtensionRoundedIcon color="primary"/>
                            <Typography
                                variant="h5"
                                marginLeft={1}
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: {xs: "flex", md: "none"},
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                Orderly
                            </Typography>
                        </Box>
                        <TextField
                            placeholder="Benutzername"
                            value={username}
                            fullWidth
                            margin="normal"
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            placeholder="Passwort"
                            type={"password"}
                            value={password}
                            margin="normal"
                            fullWidth
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            placeholder="Passwort bestätigen"
                            type={"password"}
                            value={confirmPassword}
                            margin="normal"
                            fullWidth
                            onChange={handleConfirmPasswordChange}
                        />
                        <Button variant="contained" type={"submit"} sx={{m: 1}}>
                            Registrieren
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                </Container>
            </Layout>
        </>
    );
}