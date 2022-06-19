import React from "react";
import { Polyline, Popup } from 'react-leaflet';

// props contains name and risk of failure value
function Label(props)
{
    return (
        <Popup>
            {props.name}
            <br/>
            Risk of Failure: {props.risk}
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
            <Label name={props.name} risk={risk}/>
        </Polyline>
    );
}

export default Powerline;
