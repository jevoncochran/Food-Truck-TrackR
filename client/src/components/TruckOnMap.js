import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

function Map(props) {
    return (
        <GoogleMap defaultZoom={15} defaultCenter={{ lat: props.truckCoordinates.lat, lng: props.truckCoordinates.long }}>
            <Marker position={{ lat: props.truckCoordinates.lat, lng: props.truckCoordinates.long }} />
        </GoogleMap>
    )
}

const TruckOnMap = withScriptjs(withGoogleMap(Map));

export default TruckOnMap;