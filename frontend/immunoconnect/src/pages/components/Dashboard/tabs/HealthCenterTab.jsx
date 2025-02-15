import React, { useEffect, useState, useRef } from "react";

const HealthCenterTab = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [trafficLayer, setTrafficLayer] = useState(null);

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (typeof window.google === "undefined" || !window.google.maps) {
        console.log("Loading Google Maps API...");
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v6.8/mapsJavaScriptAPI.js";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log("Google Maps API loaded");
          initializeMap();
        };
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
      console.log("Initializing map...");

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 30.267153, lng: -97.743057 },
        zoom: 12,
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [
              { saturation: 20 },
              { lightness: 10 },
              { visibility: "on" },
            ],
          },
        ],
      });

      setMap(newMap);
      const newTrafficLayer = new window.google.maps.TrafficLayer();
      newTrafficLayer.setMap(newMap);
      setTrafficLayer(newTrafficLayer);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log("User location:", userLocation);
            setCurrentLocation(userLocation);
            new window.google.maps.Marker({
              map: newMap,
              position: userLocation,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              },
            });
            newMap.setCenter(userLocation);
          },
          (error) => {
            console.error("Geolocation error:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
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
