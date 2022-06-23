import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";


function ThresholdInput()
{
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [thresholdValue, setThresholdValue] = useState(0.5);
    const [tmpThreshold, setTmpThreshold] = useState(0.5);

    const handleClickOpen = () => 
    {
        setOpen(true);
    };

    const handleClickClose = () => 
    {
        setOpen(false);
    };

    const handleWindowResize = () => 
    {
        setWidth(window.innerWidth);
    }

    useEffect(() => {  
        setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        axios.get("http://localhost:8000/edit-threshold/")
            .then(res =>
                {
                    let currentThreshold = res.data[0].value;
                    setThresholdValue(currentThreshold);
                }
            )
    }, []);

    const changeThresholdValue = () => 
    {
        if (0 <= tmpThreshold && tmpThreshold <= 1)
        {
            let data = new FormData();
            data.append("value", tmpThreshold);
            axios.put("http://localhost:8000/edit-threshold/", data)
                .then(setThresholdValue(tmpThreshold));
            
            // reload page
            document.location.reload();
                
        }
        else
        {
            alert("INVALID INPUT");
        }
    }

    return (
        <div style={{
            position:'relative',
            borderRadius: "0px 0px 0px 20px",
            color:'white',
            outline: 'none',
            backgroundColor:'#3783e6',
            top:"75%",
            left: "75vw",
            width: "25%",
            zIndex:1000,
        }}>

            <Typography variant={width < 350 ? "caption" : width < 550 ? "h7" : width < 700 ? "h6" : width < 1000 ? "h5" : "h5"} sx={{fontFamily: 'monospace',
                fontWeight: 700, }}>Threshold Value: {thresholdValue}</Typography> 
            <Button variant="contained" onClick={handleClickOpen} sx={{
                borderRadius: "0px 0px 0px 20px",
                width: "100%",
                
            }}>
                <Typography variant={width < 350 ? "caption" : width < 550 ? "h7" : width < 700 ? "h7" : width < 1000 ? "h6" : "h6"} sx={{fontFamily: 'monospace',
            fontWeight: 300,}}>UPDATE THRESHOLD</Typography>
            </Button>
        
            
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Edit Threshold Value</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please input a threshold value between 0 and 1.
                    </DialogContentText>
                    <TextField autoFocus margin="dense" id="value" label="Threshold Value" fullWidth variant="standard" onChange={(e) => setTmpThreshold(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={changeThresholdValue}>Confirm</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
}

export default ThresholdInput;