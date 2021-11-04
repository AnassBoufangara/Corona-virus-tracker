import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataMap } from '../../utils/Util';

import './Map.css';

function Map ({center, zoom, countries, casesType}) {
    {
        console.log(casesType);
        console.log({center});
        console.log({zoom});
        console.log("Map Rendered......");
    }
    return (
        <div className="map">
            
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    showDataMap(countries, casesType)
                }
            </MapContainer>
        </div>
    )
}

export default Map;
