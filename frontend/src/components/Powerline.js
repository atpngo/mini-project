import { fontSize, textAlign } from "@mui/system";
import React from "react";
import { Polyline, Popup } from 'react-leaflet';

// props contains name and risk of failure value
function Label(props)
{
    return (
        <Popup>
            
            <div style={{
                alignItems:'center',
                textAlign:'center',
                fontSize: 'medium',
                color: props.color
            }}><strong>{props.name}</strong></div>
            <div style={{
                textAlign:'center'
            }}>Risk of Failure: {props.risk}</div>
        </Popup>
    );
}

// Props should contain: name, wear, weather, vegetation, geometry[coordinates], threshold
function Powerline(props)
{
    let risk = props.wear*props.weather*props.vegetation;
    let lineColor = risk >= props.threshold ? "red" : "green";
    let colorOption = { color : lineColor };

    return (
        <Polyline pathOptions={colorOption} positions={props.coordinates}>
            <Label name={props.name} risk={risk} color={lineColor}/>
        </Polyline>
    );
}

export default Powerline;
