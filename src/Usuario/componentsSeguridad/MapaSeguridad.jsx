import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import { EditControl } from "react-leaflet-draw";

export const MapaSeguridad = ({ currentLocation, onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState({
    latitud: null,
    longitud: null,
  });

  const featureGroupRef = useRef({});
  console.log("REF", featureGroupRef);

  useEffect(() => {
    setMarkerPosition({
      latitud: currentLocation.latitud,
      longitud: currentLocation.longitud,
    });
  }, [currentLocation]);

  useEffect(() => {
    console.log("MARKER POSITION", markerPosition);
    console.log("REF DESPUES", featureGroupRef);
  }, [markerPosition]);

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
    <>
      {markerPosition &&
        markerPosition.latitud !== null &&
        markerPosition.longitud !== null && (
          <MapContainer
            center={[markerPosition.latitud, markerPosition.longitud]}
            zoom={13}
            style={{ height: "600px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MapCenter
              center={[markerPosition.latitud, markerPosition.longitud]}
            />
            <Marker
              position={[markerPosition.latitud, markerPosition.longitud]}
            />
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                draw={{
                  featureGroup: featureGroupRef.current?.getLayers?.(),
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
        )}
    </>
  );
};
