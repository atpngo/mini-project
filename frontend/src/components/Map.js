import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Rectangle } from 'react-leaflet';
import '../styles/Map.css';
import Powerline from "./Powerline";

function Map()
{   
    const [lines, setLines] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    


    useEffect(() => {
        setLines([]);
        // Figure out the number of pages you have
        axios.get('http://localhost:8000/powerlines/')
            .then((res) => {
                let data = res.data.results.length;
                let totalDataCount = res.data.count;
                setPageCount(Math.ceil(totalDataCount/data));
            });
        // For each page, plot all graphs
        let pages= Array(pageCount).join(".").split(".");
        pages = pages.map((element, index) => {
            return '?page=' + parseInt(index+1);
        });


        let promises = [];
        let powerlineObjects = [];
        for (let currentPage=0; currentPage<pageCount; currentPage++)
        {
            
            axios.get('http://localhost:8000/powerlines/' + pages[currentPage])
            .then((res) => {
                let lineData = res.data.results;
                let numLines = lineData.length;
                // console.log(lineData);
                
                for (let lineNumber=0; lineNumber<numLines; lineNumber++)
                {
                    let data = res.data.results[lineNumber];
                    // console.log(data)
                    let lineObject = {};
                    lineObject['wear'] = data.wear;
                    lineObject['weather'] = data.weather;
                    lineObject['vegetation'] = data.vegetation;
                    lineObject['name'] = data.name;
                    let newCoords = [];
                    // flip latlng to lnglat
                    for (let i=0; i<data.geometry.coordinates.length; i++)
                    {
                        let tmp = [];
                        for (let j=0; j<data.geometry.coordinates[i].length; j++)
                        {
                            tmp.push((data.geometry.coordinates[i][j]).reverse());
                        }
                        newCoords.push(tmp);
                    }
                    lineObject['coordinates'] = newCoords;
                    // powerlineObjects.push(lineObject);
                    setLines(prevState => [...prevState, lineObject]);
                }
            })
        }
    }, []);


    const doThis = (e) =>
    {
        console.log(lines);
    }

    const redOptions = { color : 'purple' };
    const greenOptions = { color : 'green' };
    const rectangle = [
        [38.546501023184646, -121.76321817174035],
        [38.58325086112612, -121.73167409436275]
    ]
    return (
        <div>
            <MapContainer center={[35.606914, -118.249178]} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[35.606914, -118.249178]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
                {lines.map(powerline => {
                    return <Powerline name={powerline.name} wear={powerline.wear} weather={powerline.weather} vegetation={powerline.vegetation} coordinates={powerline.coordinates} threshold={0.5}></Powerline>
                })}
                {/* <Polyline pathOptions={redOptions} positions={polyline}><Popup>Lillian Brown Line</Popup></Polyline> */}
                {/* <Rectangle bounds={rectangle} pathOptions={greenOptions}/> */}
            </MapContainer>
            put input here later
            <button onClick={doThis}>click me</button>
        </div>
    ); 
}

export default Map;