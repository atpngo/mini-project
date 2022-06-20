import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Rectangle } from 'react-leaflet';
import '../styles/Map.css';
import Powerline from "./Powerline";
import ThresholdInput from "./ThresholdInput";

function Map()
{   
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [threshold, setThreshold] = useState(0.5);
    
    useEffect(() => {
        setLines([]);
        setLoading(true);
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
                    // setLines(response);
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
                                for (let j=0; j<lineData.geometry.coordinates[i].length; j++)
                                {
                                    tmp.push((lineData.geometry.coordinates[i][j]).reverse());
                                }
                                newCoords.push(tmp);
                            }
                            lineObject['coordinates'] = newCoords;
                            // console.log(lineObject);
                            setLines(prevState => [...prevState, lineObject]);
                        }
                    }
                    // get threshold info
                    axios.get("http://localhost:8000/edit-threshold/")
                        .then(res => 
                            {
                                setThreshold(res.data[0].value)
                            });

                    setLoading(false);
                }
                )

            });

    }, []);


    


    const doThat = () =>
    {
        console.log(lines);
    }

    const redOptions = { color : 'purple' };
    const greenOptions = { color : 'green' };
    const rectangle = [
        [38.546501023184646, -121.76321817174035],
        [38.58325086112612, -121.73167409436275]
    ]

    if (loading)
    {
        return <p>Loading...</p>
    }


    return (
        <div>
            <MapContainer center={[35.606914, -118.249178]} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {lines.map((powerline, index) => {
                    return <Powerline key={index} name={powerline.name} wear={powerline.wear} weather={powerline.weather} vegetation={powerline.vegetation} coordinates={powerline.coordinates} threshold={threshold}></Powerline>
                })}

            </MapContainer>
            put input here later
            <button onClick={doThat}>print line data</button>
            <ThresholdInput></ThresholdInput>
            <br/>
        </div>
    ); 
}

export default Map;