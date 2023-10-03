import React, { createContext, useContext, useEffect, useState } from "react";
import getLocation from "../utils/getCurrentLocation";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  error: { message: string } | string | null;
}
interface LocationContextType {
  location: LocationData;
  permissionError: string;
  fetchLocation: () => void;
}
const locationContext = createContext<LocationContextType | undefined>(
  undefined
);

interface LocationProviderProps {
  children: React.ReactNode;
}
export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [permissionError, setPermissionError] = useState("");
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    error: null || { message: "" },
  });

  function getPermission(fn: () => void) {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          fn();
        });
      setPermissionError("");
    } else {
      setPermissionError("Geolocation is not supported by this browser.");
      console.log("Geolocation is not supported by this browser.");
    }
  }
  async function fetchLocation() {
    getPermission(async () => {
      try {
        const { latitude, longitude } = (await getLocation()) as any;

        setLocation({ latitude, longitude, error: null });
      } catch (error: any) {
        setLocation({
          latitude: null,
          longitude: null,
          error: error.message,
        });
      }
    });
  }

  const values = { location, permissionError, fetchLocation };

  return (
    <locationContext.Provider value={values}>
      {children}
    </locationContext.Provider>
  );
};

const useLocation = (): LocationContextType => {
  const context = useContext(locationContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useLocation;
