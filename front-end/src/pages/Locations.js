import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, MarkerF } from  "@react-google-maps/api"
import "../styles/Map.css"
import React, { useState, useEffect } from "react";
import { getNearbyLocations } from "../services/menuService";


export default function Locations(){
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [locations, setLocations] = useState([]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA8oguzweCmBK3KUJTIckl3rdRO17iKQjg"
    });

    

    useEffect(() => {

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

                });
            } else {
            setLatitude(0);
            setLongitude(0);
            }
    

      },[]);

      useEffect(() => {
        getNearbyLocations(latitude,longitude).then(response => {
            setLocations(response.locations);
            });
      },[latitude,longitude]);




    if(!isLoaded) return <div>Loading...</div>

    if(locations.length!==0){
        return(
            <div style={{height:"100vh",width:"100%"}}>
                <GoogleMap zoom={13} center = {{lat:latitude, lng: longitude}} mapContainerClassName="map-container">
                    {locations.map((item,index) => {
                    
                        return (
                            <MarkerF position={{lat:item.geometry.location.lat,lng:item.geometry.location.lng}}/>
                                )
                        
                    })}

                </GoogleMap>

                


            </div>
        )
    }
    return(
        <div style={{height:"100vh",width:"100%"}}>
            <GoogleMap zoom={13} center = {{lat:latitude, lng: longitude}} mapContainerClassName="map-container"></GoogleMap>

        </div>
    )
}