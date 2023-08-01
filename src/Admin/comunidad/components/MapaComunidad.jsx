import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet"
export const MapaComunidad = ({ currentLocation, onLocationChange }) => {
    const [markerPosition, setMarkerPosition] = useState({
      latitud: "",
      longitud: "",
    });
  
    useEffect(() => {
      setMarkerPosition({
        latitud: currentLocation.latitud,
        longitud: currentLocation.longitud,
      });
    }, [currentLocation]);
  
    const featureGroupRef = useRef();
  
    const onDrawn = (e) => {
      const layer = e.layer;
      const latLng = layer.getLatLng();
      setMarkerPosition({
        latitud: latLng.lat,
        longitud: latLng.lng,
      });
      onLocationChange(latLng.lat, latLng.lng);
    };

    const MapCenter = ({ center }) => {
        const map = useMap();
        map.setView(center, map.getZoom());
        return null;
      };
  
    return (
      <MapContainer
        center={[markerPosition.latitud, markerPosition.longitud]}
        zoom={13}
        style={{ height: "600px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
   <MapCenter center={[markerPosition.latitud, markerPosition.longitud]} />
   <Marker position={[markerPosition.latitud, markerPosition.longitud]}></Marker>
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            draw={{
              featureGroup: featureGroupRef.current,
              marker: {
                icon: new L.Icon.Default(),
              },
              polyline: false,
              rectangle: false,
              circle: false,
              circlemarker: false,
            }}
            onCreated={onDrawn}
            onEdited={onDrawn}
          />
        </FeatureGroup>
      </MapContainer>
    );
  };