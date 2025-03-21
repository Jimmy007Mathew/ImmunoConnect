import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Map container style
const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

// Default center (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const HealthCenterTab = () => {
  const [location, setLocation] = useState(defaultCenter);
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      },
      () => {
        alert("Geolocation not available or permission denied.");
        setIsLoading(false);
      },
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Title */}

      {/* Map and Hospital List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-1">
          <LoadScript
            googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={14}
              onLoad={onMapLoad}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
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
        </div>

        {/* Hospital List Section */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Nearby Hospitals
          </h2>
          {isLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : hospitals.length === 0 ? (
            <div className="text-center text-gray-600">
              No hospitals found nearby.
            </div>
          ) : (
            <div className="space-y-4">
              {hospitals.map((hospital, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {hospital.name}
                  </h3>
                  <p className="text-sm text-gray-600">{hospital.vicinity}</p>
                  {hospital.rating && (
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-700 ml-1">
                        {hospital.rating} ({hospital.user_ratings_total || 0}{" "}
                        reviews)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthCenterTab;
