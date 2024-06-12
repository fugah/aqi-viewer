const apiToken = import.meta.env.VITE_API_TOKEN;

/*
    fetches the AQI data for each city and uses them to reset the state 
    array triggering re-rendering
    if an error occurs, the array is populated with an error object for
    each city 
  */
export async function fetchAqiData(locations, setLocationAqiDataArray, setLastRefreshDateTime) {
    try {
        const aqiDataArray = []
        for (let i = 0; i < locations.length; i++) {
            const aqiData = await fetchAqiDataForCity(locations[i].cityApiName)
            aqiDataArray.push(aqiData)
        }

        setLocationAqiDataArray(aqiDataArray);
        setLastRefreshDateTime(new Date().toLocaleString());

    } catch (error) {
        console.error(error);
        const aqiDataArray = []
        for (let i = 0; i < locations.length; i++) {
            const aqiData = {
                cityKeyName: locations[i].cityApiName,
                errorMessage: 'Connection Error'
            }
            aqiDataArray.push(aqiData)
        }

        setLocationAqiDataArray(aqiDataArray);
    }
};

/*
  fetches the city's AQI data from the api and returns a custom object
  with the data we want to display
  If the API returns an error, an object is returned with the error message
*/
async function fetchAqiDataForCity(city) {
    const url = `https://api.waqi.info/feed/${city}/?token=${apiToken}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    const data = responseJson.data;
    if (responseJson.status === 'error') {
        return {
            cityKeyName: city,
            errorMessage: data
        }
    }
    return {
        cityKeyName: city,
        aqi: data.aqi,
        cityFullName: data.city.name,
        updatedDateTime: new Date(data.time.iso).toLocaleString(),
    };
}