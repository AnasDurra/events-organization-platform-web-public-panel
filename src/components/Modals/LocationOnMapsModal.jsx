import React, { useEffect, useRef, useState } from "react";
import {
    APIProvider,
    InfoWindow,
    Map,
    Marker,
} from "@vis.gl/react-google-maps";
import { Button, Col, Input, Modal, Row, message } from "antd";

const DefaultLocation = { lat: 33.5138, lng: 36.2765 };

const LocationOnMapsModal = ({
    isLocationOnMapModalOpen,
    setIsLocationOnMapModalOpen,
    position,
    setPosition,
}) => {
    const [zoom, setZoom] = useState(9);
    const [tempPosition, setTempPosition] = useState(position);

    const handleOk = () => {
        message.success("Location Add Successfully .. ");
        setIsLocationOnMapModalOpen(false);
        setPosition(tempPosition ?? DefaultLocation);
    };
    const handleCancel = () => {
        setIsLocationOnMapModalOpen(false);
    };

    const handleMarkerDrag = (event) => {
        setTempPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    };
    const handleMapClick = (event) => {
        setTempPosition({
            lat: event.detail.latLng.lat,
            lng: event.detail.latLng.lng,
        });
    };

    function handleResetLocation() {
        setTempPosition({ ...DefaultLocation });
        setZoom(9);
    }
    function handleChangeZoom(newZoom) {
        setZoom(newZoom.detail.zoom);
    }
    useEffect(() => {
        console.log(position);
    }, [position]);
    return (
        <Modal
            title="Select Event Location"
            open={isLocationOnMapModalOpen}
            okText={"Save Location"}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
        >
            <Row gutter={16} align="middle" style={{ marginBottom: "16px" }}>
                <Col span={6}>
                    <label>Latitute:</label>
                    <Input
                        value={tempPosition?.lat ?? DefaultLocation.lat}
                        disabled
                    />
                </Col>
                <Col span={6}>
                    <label>Longitute:</label>
                    <Input
                        value={tempPosition?.lng ?? DefaultLocation.lng}
                        disabled
                    />
                </Col>
            </Row>
            <Row gutter={16} align="middle" style={{ marginBottom: "16px" }}>
                <Col span={6}>
                    <Button onClick={handleResetLocation}>
                        Reset Location
                    </Button>
                </Col>
            </Row>
            <APIProvider apiKey={"AIzaSyBKs-O-rGymgEBAn5PKn413rFC_O8jn_aE"}>
                <div style={{ height: "50vh", width: "100%" }}>
                    <Map
                        defaultCenter={DefaultLocation}
                        zoom={zoom}
                        onZoomChanged={handleChangeZoom}
                        onClick={handleMapClick}
                    >
                        <Marker
                            position={tempPosition ?? DefaultLocation}
                            draggable={true}
                            onDragEnd={handleMarkerDrag}
                        />
                    </Map>
                </div>
            </APIProvider>
        </Modal>
    );
};
export default LocationOnMapsModal;
