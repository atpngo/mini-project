import React, {useEffect, useState} from "react";
import axios from "axios";
import { Autocomplete, Button, TextField } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import Powerline from "./Powerline";
import Loading from "./Loading";

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
                let pageCount = Math.ceil(totalDataCount/data);
                if (pageCount > 0)
                {
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
                                lineObject['originalCoordinates'] = lineData.geometry;
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
                    })
                }
                else
                {
                    setLoading(false);
                }
            });


    }, []);



    const handleSearchChange = (e, newVal) =>
    {
        setValue(newVal);
        let search = lines.filter(line => { return line.name === newVal; });
        // set up updating
        if (search.length > 0)
        {
            let line = search[0];
            document.getElementById("name").value = line.name;
            document.getElementById("wear").value = line.wear;
            document.getElementById("weather").value = line.weather;
            document.getElementById("vegetation").value = line.vegetation;
            setLine(line);
            setPowerline(<Powerline name={line.name} wear={line.wear} weather={line.weather} vegetation={line.vegetation} coordinates={line.coordinates} threshold={1}/>);
        }
        // otherwise leave input
        else
        {
            document.getElementById("name").value = null;
            document.getElementById("wear").value = null;
            document.getElementById("weather").value = null;
            document.getElementById("vegetation").value = null;

            setLine(null);
            setPowerline(null);
        }

    }
    

    const textFieldStyle = {
        width:'90%'
    }

    const buttonStyle = {
        width:'90%',
        backgroundColor:'#3783e6',
        color:'white'
    }

    const buttonUpdateStyle = {
        width:'50%',
        backgroundColor:'#3783e6',
        color:'white'
    }

    const buttonDeleteStyle = {
        width:'50%',
        backgroundColor:'#db4a40',
        color:'white'
    }


    const parseInput = (wear, weather, vegetation, name) =>
    {
        if (name.length < 1)
        {
            return false;
        }
        if (wear === 'NaN' || weather === 'NaN' || vegetation === 'NaN')
        {
            return false;
        }
        if ((0 <= wear && wear <= 1) && (0 <= weather && weather <= 1) && (0 <= vegetation && vegetation <= 1))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    const updatePowerline = () =>
    {
        let name = document.getElementById("name").value;
        let wear = parseFloat(document.getElementById("wear").value);
        let weather = parseFloat(document.getElementById("weather").value);
        let vegetation = parseFloat(document.getElementById("vegetation").value);
        let isValid = parseInput(wear, weather, vegetation, name);
        
        if (isValid)
        {
            // then send update req
            let data = new FormData();
            data.append("name", line.name);
            data.append("wear", wear);
            data.append("vegetation", vegetation);
            data.append("weather", weather);
            data.append("newName", name);
            axios.put("http://localhost:8000/update-powerline/", data)
                .then(window.location.reload());
        }
    }

    const Map = () => 
    {
        return (
            <div>
                <MapContainer 
                    style={{
                        width: '74vw', height: '75%'
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
    
    const deletePowerline = () =>
    {
        let name = line.name;
        axios.post("http://localhost:8000/delete-powerline/", {'name':name})
            .then( res => {
                document.location.reload();
            })
    }

    const addPowerline = () =>
    {
        let name = document.getElementById("name").value;
        let wear = parseFloat(document.getElementById("wear").value);
        let weather = parseFloat(document.getElementById("weather").value);
        let vegetation = parseFloat(document.getElementById("vegetation").value);
        let geometry = document.getElementById("geometry").value;
        let isValid = parseInput(wear, weather, vegetation, name);
        if (isValid)
        {
            let data = new FormData();
            data.append("name", name);
            data.append('wear', wear);
            data.append("weather", weather);
            data.append("vegetation", vegetation);
            data.append("geometry", geometry.replaceAll("'", '"'));
            axios.post("http://localhost:8000/add-powerline/", data)
                .then(res => console.log(res));
        }
    }

    if (loading)
    {
        return <Loading/>
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
                {(value === null || value === 'Add a new Powerline') ? <Button onClick={addPowerline} style={buttonStyle} >ADD POWERLINE</Button> : <div style={{width:"90%", marginLeft:"auto", marginRight:"auto"}}><Button onClick={updatePowerline} style={buttonUpdateStyle}>UPDATE POWERLINE</Button><Button onClick={deletePowerline} style={buttonDeleteStyle} >DELETE POWERLINE</Button></div>}
                </div>
            </div>
            <br></br>
            <div style={{display:'flex', height:'100vh'}}>
                <div style={{
                    width:'25vw', height: 'auto'
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
                    {(value === null || value === 'Add a new Powerline') && <TextField style={textFieldStyle} id="geometry" multiline rows={10} label="Geometry" InputLabelProps={{shrink: true}}/>}
                </div>
                <Map/>
            </div>
            
        </div>
    );
}

export default EditPowerlines;