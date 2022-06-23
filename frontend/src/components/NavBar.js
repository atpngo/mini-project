import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
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
import { Grid, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = ['EDIT POWERLINES'];

const NavBar = () => {
    let navigate = useNavigate();

    let {user, logoutUser} = useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavigate = () => 
    {
        setAnchorElNav(null);
        navigate('/edit');
    }

    const goToMap = () =>
    {
        navigate('/map');
    }

    return user ? (
        <div style={{
            zIndex:10000
        }}>
        <AppBar position="static" style={{backgroundColor:'#3783e6'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                GIRS CHALLENGE
            </Typography>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
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
                    display: { xs: 'block', md: 'none' },
                }}
                >
                
                    <MenuItem onClick={handleNavigate}>
                    <Typography textAlign="center">EDIT POWERLINES</Typography>
                    </MenuItem>
                    
                <MenuItem><Typography onClick={logoutUser} textAlign="center">LOGOUT</Typography></MenuItem>
                </Menu>
            </Box>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
                onClick={goToMap}
            >
                GIRS CHALLENGE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                    onClick={handleNavigate}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    EDIT POWERLINES
                </Button>
            </Box>
            

            

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <Typography onClick={logoutUser}>LOGOUT {user.username}</Typography>
                
            </Box>

            </Toolbar>
            
        </Container>
        </AppBar>
        </div>
    ) : (
            <Paper component={Stack} direction="column" justifyContent="center" sx={{backgroundColor:"#3783e6", color:"white", height: "60px"}}>
            <div style={{display: "block", marginLeft: "auto", marginRight: "auto"}}>
            <Typography 
                variant="h6"
                onClick={goToMap}
                sx={{
                mr: 2,
                // margin: 2,
                justify: 'center',
                alignItems: 'center',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                GIRS CHALLENGE
            </Typography>
            </div>
            </Paper>
    );
};
export default NavBar;