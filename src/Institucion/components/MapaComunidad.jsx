import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const MapCenter = ({ center }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  };
  
  export const MapaComunidad = ({ comunidad }) => {
    console.log(comunidad);
    const [markersData, setMarkersData] = useState([]);
    
  
    return (
      <MapContainer center={[comunidad.latitud, comunidad.longitud]} zoom={13} style={{ height: "600px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
  
        <MapCenter center={[comunidad.latitud, comunidad.longitud]} /> {/* Componente para centrar el mapa en la ubicación proporcionada */}
        
        <Marker position={[comunidad.latitud, comunidad.longitud]}>
          <Popup>
            <p>
              <strong>Comunidad: {comunidad.nombre}</strong>
            </p>
            <p>Direccion: {comunidad.direccion}</p>
          </Popup>
        </Marker>
  
        {markersData.map((marker) => (
          <Marker key={marker._id} position={[marker.latitud, marker.longitud]}>
            <Popup>
              <img
                src={marker.img}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                alt="Hotel"
              ></img>
              <p>
                <strong>Hotel: {marker.nombre}</strong>
              </p>
              <p>Pais: {marker.pais}</p>
              <p>Direccion: {marker.direccion}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };