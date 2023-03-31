import React, {ChangeEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import Container from "@mui/material/Container";

export default function SignUpPage() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
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
        <>
            <Container>
                <Box component={"form"} onSubmit={handleSubmit}
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         margin: 2,
                         '&:hover': {
                             backgroundColor: '',
                             opacity: [0.9, 0.8, 0.7],
                         },
                     }}
                >
                    <TextField placeholder="Username" value={username} fullWidth
                               margin="normal" onChange={handleUsernameChange}/>
                    <TextField placeholder="Password" type={"password"} value={password}
                               margin="normal" fullWidth onChange={handlePasswordChange}/>
                    <Button variant="contained" type={"submit"} sx={{
                        m: 1
                    }}>registrieren</Button>
                </Box>
            </Container>
        </>
    )
}