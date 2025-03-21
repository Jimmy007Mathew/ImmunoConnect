import React, { useEffect, useRef, useState } from "react";

const HealthCenterTab = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const GOOGLE_MAPS_API_KEY = "AIzaSyCFOvCB7y-1bcGOje2W0eTg2a0NWTTT-Lk"; // Replace with your API key

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (typeof window.google === "undefined" || !window.google.maps) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        script.onerror = () => console.error("Failed to load Google Maps API");
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!window.google || !mapRef.current) {
        console.error("Google Maps API is not available or mapRef is null");
        return;
      }

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 30.267153, lng: -97.743057 }, // Default center (Austin, TX)
        zoom: 12,
      });

      setMap(newMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            setCurrentLocation(userLocation);

            // Add a marker for the user's location
            new window.google.maps.Marker({
              map: newMap,
              position: userLocation,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              },
            });

            newMap.setCenter(userLocation);
            fetchNearbyPlaces(newMap, userLocation);
          },
          (error) => {
            console.error("Geolocation error:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const fetchNearbyPlaces = (mapInstance, location) => {
      const service = new window.google.maps.places.PlacesService(mapInstance);

      const request = {
        location,
        radius: 5000, // Search within 5 km
        type: ["hospital", "health"],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            new window.google.maps.Marker({
              map: mapInstance,
              position: place.geometry.location,
              title: place.name,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red pin for hospitals
              },
            });
          });
        } else {
          console.error("Places API Error:", status);
        }
      });
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div>
      <h2>Nearby Health Centers</h2>
      <div
        ref={mapRef}
        id="map"
        style={{ height: "500px", width: "100%" }}
      ></div>
    </div>
  );
};

export default HealthCenterTab;
