import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194,
};

const HealthCenterTab = () => {
  const [location, setLocation] = useState(defaultCenter);
  const [hospitals, setHospitals] = useState([]);
  const mapRef = useRef(null);
  const serviceRef = useRef(null);

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);
      },
      () => alert("Geolocation not available"),
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch nearby hospitals after map loads
  const onMapLoad = (map) => {
    mapRef.current = map;
    if (!serviceRef.current) {
      serviceRef.current = new window.google.maps.places.PlacesService(map);
    }
    fetchNearbyHospitals();
  };

  const fetchNearbyHospitals = () => {
    if (!serviceRef.current || !location.lat || !location.lng) return;

    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: 5000, // 5km radius
      type: "hospital",
    };

    serviceRef.current.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
      } else {
        console.error("Places API Error: ", status);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={14}
        onLoad={onMapLoad}
      >
        {/* User Location Marker */}
        <Marker
          position={location}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
          title="Your Location"
        />

        {/* Hospital Markers */}
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            position={{
              lat: hospital.geometry.location.lat(),
              lng: hospital.geometry.location.lng(),
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
            title={hospital.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default HealthCenterTab;
