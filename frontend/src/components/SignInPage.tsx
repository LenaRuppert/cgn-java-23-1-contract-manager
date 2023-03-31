import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";

type SignInPageProps = {
    getAllClients: () => void
    getAllJobs: () => void
}
export default function Login(props: SignInPageProps) {
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
                     }}
                >
                    <TextField placeholder="Benutzername" value={username} fullWidth
                               margin="normal" onChange={handleUsernameChange}/>
                    <TextField placeholder="Passwort" type={"password"} value={password}
                               margin="normal" fullWidth onChange={handlePasswordChange}/>
                    <Button variant="contained" type={"submit"} sx={{
                        m: 1
                    }}>Login</Button>
                </Box>
            </Container>
        </>
    )
}