import React, {useEffect, useState} from "react";
import axios from "axios";
import { Autocomplete, Button, Input, TextField } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import Powerline from "./Powerline";

function EditPowerlines()
{
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);
    const [powerline, setPowerline] = useState(null);
    const [line, setLine] = useState(null);

    useEffect(() => {
        setLines([]);
        axios.get('http://localhost:8000/powerlines/')
            .then((res) => {
                let data = res.data.results.length;
                let totalDataCount = res.data.count;
                let pages= Array(Math.ceil(totalDataCount/data)).join(".").split(".");
                pages = pages.map((element, index) => {
                    return 'http://localhost:8000/powerlines/?page=' + parseInt(index+1);
                });
                axios.all(
                    pages.map((page) => axios.get(page))
                )
                .then( response => {
                    let responseLength = response.length;
                    for (let i=0; i<responseLength; i++)
                    {
                        let pageData = response[i].data.results;
                        for (let j=0; j<pageData.length; j++)
                        {
                            let lineData = pageData[j];
                            let lineObject = {};
                            lineObject['wear'] = lineData.wear;
                            lineObject['weather'] = lineData.weather;
                            lineObject['vegetation'] = lineData.vegetation;
                            lineObject['name'] = lineData.name;
                            let newCoords = [];
                            
                            // flip latlng to lnglat
                            for (let i=0; i<lineData.geometry.coordinates.length; i++)
                            {
                                let tmp = [];
                                // in the rare event that we just have a normal 2D array 
                                if (typeof(lineData.geometry.coordinates[i][0]) !== "object")
                                {
                                    tmp.push((lineData.geometry.coordinates[i]).reverse());
                                }
                                // most arrays we get are 3D
                                else
                                {
                                    for (let j=0; j<lineData.geometry.coordinates[i].length; j++)
                                    {
                                        tmp.push((lineData.geometry.coordinates[i][j]).reverse());
                                    }
                                }
                                newCoords.push(tmp);
                            }
                            lineObject['coordinates'] = newCoords;
                            // console.log(lineObject);
                            setLines(prevState => [...prevState, lineObject]);
                        }
                    }
                    

                    setLoading(false);
                }
                )

            });


    }, []);



    const handleSearchChange = (e, newVal) =>
    {
        setValue(newVal);
        console.log(newVal);
        let search = lines.filter(line => { return line.name === newVal; });
        // set up updating
        if (search.length > 0)
        {
            let line = search[0];
            document.getElementById("name").value = line.name;
            document.getElementById("wear").value = line.wear;
            document.getElementById("weather").value = line.weather;
            document.getElementById("vegetation").value = line.vegetation;
            document.getElementById("coordinates").value = JSON.stringify(line.coordinates);
            setLine(line);
            console.log(line.coordinates[0][0])
            setPowerline(<Powerline name={line.name} wear={line.wear} weather={line.weather} vegetation={line.vegetation} coordinates={line.coordinates} threshold={1}/>);
        }
        // otherwise leave input
        else
        {
            document.getElementById("name").value = null;
            document.getElementById("wear").value = null;
            document.getElementById("weather").value = null;
            document.getElementById("vegetation").value = null;
            document.getElementById("coordinates").value = null;
        }

    }
    if (loading)
    {
        return <p>Loading...</p>
    }

    const textFieldStyle = {
        width:'90%'
    }

    const buttonStyle = {
        width:'90%',
        backgroundColor:'#3783e6',
        color:'white'
    }

    const Map = ({center, zoom}) => 
    {
        const [map, setMap] = useState(null);
        if (map)
        {
            map.flyTo(center);
        }
        return (
            <div>
                {/* put map here */}
                <MapContainer 
                    style={{
                        width: '75vw', height: '100%'
                    }}
                    center={line ? line.coordinates[0][0] : [38.475879, -121.772135]}
                    zoom={13}
                    scrollWheelZoom={true}
                    >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {powerline}
                </MapContainer>
            </div>
        );
    }

    return (
        <div>

            <br></br>
            <div>
                <div>
                <Autocomplete 
                    style={{marginLeft:'auto', marginRight:'auto', width: '90%'}}
                    value={value} 
                    onChange={handleSearchChange}
                    disablePortal 
                    options={Array("Add a new Powerline").concat(lines.map(line => {return line.name}))} 
                    sx={{ width: '85vh'}}
                    renderInput={(params) => <TextField {...params} label="Search for an existing Powerline" />}
                />
                </div>
                <div>
                {(value == null || value == 'Add a new Powerline') ? <Button style={buttonStyle}>ADD POWERLINE</Button> : <Button style={buttonStyle}>UPDATE POWERLINE</Button>}
                </div>
            </div>
            <br></br>
            <div style={{display:'flex'}}>
                <div style={{
                    width:'25vw'
                }}>
                    <TextField style={textFieldStyle} id="name" label="Name" InputLabelProps={{shrink: true}}/>
                    <br/>
                    <br/>
                    <TextField style={textFieldStyle} id="wear" label="Wear" InputLabelProps={{shrink: true}}/>
                    <br/>
                    <br/>
                    <TextField style={textFieldStyle} id="weather" label="Weather" InputLabelProps={{shrink: true}}/>
                    <br/>
                    <br/>
                    <TextField style={textFieldStyle} id="vegetation" label="Vegetation" InputLabelProps={{shrink: true}}/>
                    <br/>
                    <br/>
                    <TextField style={textFieldStyle} id="coordinates" multiline rows={10} label="Coordinates" InputLabelProps={{shrink: true}}/>
                </div>
                {/* put map here */}
                <Map/>
            </div>
            <br/>
            
        </div>
    );
}

export default EditPowerlines;