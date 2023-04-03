import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";


export default function SignUpPage() {
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
        axios.post("/api/user", {username, password})
            .then(() => navigate("/login"))
            .catch(error => console.log(error))
    }

    return (
        <>
            <Container sx={{marginTop: 15}}>
                <Box component={"form"} onSubmit={handleSubmit}
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         margin: 2,
                     }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <ExtensionRoundedIcon color="primary"/>
                        <Typography
                            variant="h5"
                            marginLeft={1}
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Orderly
                        </Typography>
                    </Box>
                    <TextField placeholder="Benutzername" value={username} fullWidth
                               margin="normal" onChange={handleUsernameChange}/>
                    <TextField placeholder="Passwort" type={"password"} value={password}
                               margin="normal" fullWidth onChange={handlePasswordChange}/>
                    <Button variant="contained" type={"submit"} sx={{
                        m: 1
                    }}>Anmelden</Button>
                </Box>
            </Container>
        </>
    )
}