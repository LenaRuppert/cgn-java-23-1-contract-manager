import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const authorization = window.btoa(`${username}:${password}`)
        axios
            .post("/api/user/login", {},
                {headers: {Authorization: `Basic ${authorization}`}})
            .then(() => {
                navigate(window.sessionStorage.getItem('signInRedirect') || '/')
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
                    }}>Log in</Button>
                </Box>
            </Container>
        </>
    )
}