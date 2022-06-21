import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


function ThresholdInput()
{
    const [open, setOpen] = useState(false);
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

    useEffect(() => {  
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
            console.log("Valid Threshold Value");
            let data = new FormData();
            data.append("value", tmpThreshold);
            axios.put("http://localhost:8000/edit-threshold/", data)
                .then(setThresholdValue(tmpThreshold));
            
            // reload page
            document.location.reload();
                
        }
        else
        {
            // make this prettier later
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
            flexGrow: 1, display: { xs: 'flex', md: 'none' }
        }}>
            <div style={{
                fontSize:"large"
            }}>Threshold Value: {thresholdValue}     
            <Button variant="contained" onClick={handleClickOpen} sx={{
                borderRadius: "0px 0px 0px 20px",
                width: "100%",
                
            }}>
                EDIT THRESHOLD 
            </Button>
            </div>
            
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