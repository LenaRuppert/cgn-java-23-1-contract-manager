import React, {ChangeEvent, useState} from "react";
import axios from "axios";
import {Box, Button, TextField} from "@mui/material";
import Container from "@mui/material/Container";

type AuthFormProps = {
    endpoint: string
    buttonText: string
    onSuccess: () => void
}

export default function AuthForm(props: AuthFormProps) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        axios
            .post(props.endpoint, {username, password})
            .then(() => {
                props.onSuccess()
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
                    }}>{props.buttonText}</Button>
                </Box>
            </Container>
        </>
    )
}