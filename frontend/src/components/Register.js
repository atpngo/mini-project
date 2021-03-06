import React, { useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import axios from "axios";
import Backend from "../utils/Backend";

const theme = createTheme();

function Register()
{
    let {user} = useContext(AuthContext);

    const navigate = useNavigate();
    const login = () =>
    {
        navigate("/");
    }

    useEffect(() => {
        if (user)
        {
            navigate('/map');
        }
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = data.get('user');
        let password = data.get('password');
        let confirmPassword = data.get('password-confirm');
        if (password !== confirmPassword)
        {
            alert("Passwords must match!");
        }
        else
        {
            let data = new FormData();
            data.append('username', user);
            data.append('password', password);
            axios.post(Backend.registerURL, data)
                .then(
                    res => {
                        alert("Account succesfully created!");
                        navigate('/');
                    }
                )
                .catch(
                    err => {
                        alert("Username already exists!");
                    }
                )
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >

            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="user"
                    label="Username"
                    name="user"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password-confirm"
                    label="Confirm Password"
                    type="password"
                    id="password-confirm"
                    />
                </Grid>
                <Grid item xs={12}>
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link onClick={login} href="#" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}

export default Register;