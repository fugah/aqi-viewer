import { useState, useEffect } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import "./App.css";
import AqiCityInfo from "./components/AqiCityInfo";
import RefreshButton from "./components/RefreshButton";
import LocationButton from "./components/LocationButton";
import {fetchAqiData} from "./util/ApiFetcher";

export default function App() {

  /*
    list of the locations grouped here to make it easier
     if there are future additions/updates
     cityApiName = name expected by api url
     locationDisplayName = pretty version for user
  */
  const locations = [
    {
      cityApiName: 'here',
      locationDisplayName: 'My Location'
    },
    {
      cityApiName: 'newark',
      locationDisplayName: 'Newark'
    },
    {
      cityApiName: 'san diego',
      locationDisplayName: 'San Diego'
    },
    {
      cityApiName: 'london',
      locationDisplayName: 'London'
    },
  ];

  //the city whose AQI data is currently set to be displayed
  const [currentCity, setCurrentCity] = useState("here");

  /*
    when the data was last fetched either by page reload or by
    clicking the refresh button
    This is different from the AQI data last updated date/time, which
    is returned by the api
  */
  const [lastRefreshDateTime, setLastRefreshDateTime] = useState(new Date().toLocaleString())

  // array for the objects representing the AQI data of each city
  const [locationAqiDataArray, setLocationAqiDataArray] = useState([]);

  function handleCityChange(cityName) {
    setCurrentCity(cityName);
  }

  /*
    useEffect to fetch all the AQI data after the initial render
    Only occurs on mount due to the empty dependency array - no
    clean up needed
  */
  useEffect(() => {
    fetchAqiData(locations, setLocationAqiDataArray, setLastRefreshDateTime);
  }, []);

  return (
    <main className="col-sm-6 mx-auto my-5">
      <RefreshButton 
      refreshDateTime={lastRefreshDateTime} 
      handleClick={() => fetchAqiData(locations, setLocationAqiDataArray, setLastRefreshDateTime)} />
      <AqiCityInfo currentAqiData={locationAqiDataArray.find((city) => city.cityKeyName === currentCity)} />
      <div className="text-center">
        <ButtonGroup>
          {
            locations.map((location) => {
              return <LocationButton
                key={location.cityApiName}
                location={location}
                selectedLocation={currentCity}
                handleClick={() => handleCityChange(location.cityApiName)} />
            })
          }
        </ButtonGroup>
      </div>
    </main>
  );
}
