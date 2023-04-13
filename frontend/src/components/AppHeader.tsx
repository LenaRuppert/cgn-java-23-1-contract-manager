import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import {Link} from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        setAnchorElNav(null);
        axios.post('/api/user/logout')
            .then(() => window.location.href = '/login')
    }

    const {user} = useAuth(true);
    const isAdmin = user?.role === "admin";

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ExtensionRoundedIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link} to="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Orderly
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem key="Kundenübersicht" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link style={{textDecoration: "none", color: "black"}} to={'/'}>
                                        Kundenübersicht
                                    </Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem key="Auftragsübersicht" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link style={{textDecoration: "none", color: "black"}} to={'/jobs/all'}>
                                        Auftragsübersicht
                                    </Link>
                                </Typography>
                            </MenuItem>
                            {isAdmin && (
                                <MenuItem key={"Nutzer anlegen"} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link style={{textDecoration: "none", color: "black"}} to={'/sign-up'}>
                                            Nutzer anlegen
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            )}
                            <MenuItem key={"logout"} onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <ExtensionRoundedIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link} to="/"
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
                    <Box sx={{
                        flexGrow: 1,
                        display: {xs: 'none', md: 'flex'},
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white', display: 'flex'}}
                        >
                            <MenuItem>
                                <Link style={{textDecoration: "none", color: "white"}} to={'/'}>
                                    Kundenübersicht
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link style={{textDecoration: "none", color: "white"}} to={'/jobs/all'}>
                                    Auftragsübersicht
                                </Link>
                            </MenuItem>
                            {isAdmin && (
                                <MenuItem key={"Nutzer anlegen"} onClick={handleCloseNavMenu}>
                                    <Link style={{textDecoration: "none", color: "white"}} to={'/sign-up'}>
                                        Nutzer anlegen
                                    </Link>
                                </MenuItem>
                            )}
                            <MenuItem key={"logout"} onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar