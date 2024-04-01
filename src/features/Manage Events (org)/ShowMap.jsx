import React, { useEffect, useState } from "react";
import {
    APIProvider,
    InfoWindow,
    Map,
    Marker,
} from "@vis.gl/react-google-maps";

const ShowMap = ({ position }) => {
    return (
        <APIProvider apiKey={"AIzaSyBKs-O-rGymgEBAn5PKn413rFC_O8jn_aE"}>
            <div style={{ width: "100%", height: "30vh" }}>
                <Map
                    defaultCenter={position}
                    center={position}
                    defaultZoom={15}
                >
                    <Marker
                        position={
                            position.lat && position.lng ? position : null
                        }
                    />
                </Map>
            </div>
        </APIProvider>
    );
};

export default ShowMap;
export default ShowMap;
