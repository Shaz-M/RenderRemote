import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from  "@react-google-maps/api"
import "../styles/Map.css"
import React, { useState, useEffect } from "react";


export default function Locations(){
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA8oguzweCmBK3KUJTIckl3rdRO17iKQjg"
    });

    

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                console.log(latitude);
              });
          } else {
            setLatitude(0);
            setLongitude(0);
          }
      },[]);

    if(!isLoaded) return <div>Loading...</div>
    return(
        <div style={{height:"100vh",width:"100%"}}>
            <GoogleMap zoom={13} center = {{lat:latitude, lng: longitude}} mapContainerClassName="map-container"></GoogleMap>
        </div>
    )
}