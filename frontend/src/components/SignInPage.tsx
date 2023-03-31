import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import {Box, Button, TextField} from "@mui/material";


type SignInPageProps = {
    getAllClients: () => void
    getAllJobs: () => void
}

export default function SignInPage(props: SignInPageProps) {
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
        const authorization = window.btoa(`${username}:${password}`)
        axios
            .post(
                "/api/user/login",
                {},
                {
                    headers: {Authorization: `Basic ${authorization}`}
                })
            .then(() => {
                navigate(window.sessionStorage.getItem('signInRedirect') || '/')
                props.getAllClients()
                props.getAllJobs()
            })
            .catch(error => console.log(error))
    }

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
                    }}>login</Button>
                </Box>
            </Container>
        </>
    );
}