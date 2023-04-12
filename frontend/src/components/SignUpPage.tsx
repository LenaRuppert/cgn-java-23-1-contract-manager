import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Layout from "./Layout";
import useAuth from "../hooks/useAuth";
import MenuItem from "@mui/material/MenuItem";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {user} = useAuth(true);
    const isAdmin = user?.role === "admin";

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value);
    }

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isAdmin) {
            setError("Nur Administratoren dürfen neue Nutzer registrieren.")
        }

        if (password !== confirmPassword) {
            setError("Passwörter stimmen nicht überein.");
            return;
        }

        axios
            .post("/api/user", {username, password, role})
            .then(() => {
                handleOpenSnackbar()
                handleOpenSnackbar()
                setUsername("")
                setPassword("")
                setConfirmPassword("")
                setRole("")
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
                        ><Typography
                            variant="h5"
                            marginLeft={1}
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Neuer Nutzer:
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
                        <FormControl sx={{mt: 2}} fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Status"
                                onChange={handleRoleChange}
                            >
                                <MenuItem value="basic">Angestellter</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" type={"submit"} sx={{m: 1}}>
                            Registrieren
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                </Container>
            </Layout>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message="Nutzer erfolgreich registriert!"
                style={{top: "80px"}}
            />
        </>
    );
}
