import React, { useEffect, useRef, useState } from 'react';
import { APIProvider, InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import { Button, Col, Input, Modal, Row, Space, message } from 'antd';

const DefaultLocation = { lat: 33.792773, lng: 36.145962 };

const LocationOnMapsModal = ({ isLocationOnMapModalOpen, setIsLocationOnMapModalOpen, position, setPosition }) => {
    const [zoom, setZoom] = useState(9);
    const [tempPosition, setTempPosition] = useState(position?.lat ? position : DefaultLocation);

    const handleOk = () => {
        message.success('Location Add Successfully .. ');
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
            onCancel={handleCancel}
            width={1000}
            footer={
                <div>
                    <footer
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            key="extra"
                            type="dashed"
                            onClick={handleResetLocation}
                            // style={{
                            //     backgroundColor: "lightgray",
                            //     color: "black",
                            // }}
                        >
                            Reset Location
                        </Button>
                        <Space size={10}>
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button key="ok" type="primary" onClick={handleOk}>
                                Save Location
                            </Button>
                        </Space>
                    </footer>
                </div>
            }
        >
            <Row gutter={16} align="middle" style={{ marginBottom: '16px' }}>
                <Col span={6}>
                    <label>Latitute:</label>
                    <Input value={tempPosition?.lat ?? DefaultLocation.lat} disabled />
                </Col>
                <Col span={6}>
                    <label>Longitute:</label>
                    <Input value={tempPosition?.lng ?? DefaultLocation.lng} disabled />
                </Col>
            </Row>

            <APIProvider apiKey={'AIzaSyBKs-O-rGymgEBAn5PKn413rFC_O8jn_aE'}>
                <div style={{ height: '59vh', width: '100%' }}>
                    <Map
                        defaultCenter={tempPosition ?? DefaultLocation}
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
