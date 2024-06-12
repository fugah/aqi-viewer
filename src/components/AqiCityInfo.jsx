import Card from 'react-bootstrap/Card';

/*
  The component that displays the AQI data for the current city
*/
function AqiCityInfo({ currentAqiData }) {
  // first, check for bad data and render errors
  if (!currentAqiData || Object.keys(currentAqiData).length === 0) {
    return (
      <Card className="mb-2 text-center">
        <Card.Body>
          <Card.Text>
            No Data Available
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  else if (currentAqiData.errorMessage) {
    return (
      <Card className="mb-2 text-center">
        <Card.Body>
          <Card.Text>
            Error: {currentAqiData.errorMessage}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  let categoryDisplayName = "";
  let aqiValueClassName = ""

  // use the aqi value to determine the category to display and the class
  // to add to get the corresponding color from the css
  function determineAqiCategory() {
    if (currentAqiData.aqi >= 0 && currentAqiData.aqi <= 50) {
      categoryDisplayName = "Good";
      aqiValueClassName = "aqiCategory1";
    } else if (currentAqiData.aqi >= 51 && currentAqiData.aqi <= 100) {
      categoryDisplayName = "Moderate";
      aqiValueClassName = "aqiCategory2";
    } else if (currentAqiData.aqi >= 101 && currentAqiData.aqi <= 150) {
      categoryDisplayName = "Unhealthy for Sensitive Groups";
      aqiValueClassName = "aqiCategory3";
    } else if (currentAqiData.aqi >= 151 && currentAqiData.aqi <= 200) {
      categoryDisplayName = "Unhealthy";
      aqiValueClassName = "aqiCategory4";
    } else if (currentAqiData.aqi >= 201 && currentAqiData.aqi <= 300) {
      categoryDisplayName = "Very Unhealthy";
      aqiValueClassName = "aqiCategory5";
    } else if (currentAqiData.aqi > 300) {
      categoryDisplayName = "Hazardous";
      aqiValueClassName = "aqiCategory6";
    } else {
      categoryDisplayName = "Invalid AQI Value";
      aqiValueClassName = "aqiCategoryX";
    }
  }

  determineAqiCategory();

  return (
    <Card className="mb-2 text-center">
      <Card.Header>{currentAqiData.cityFullName}</Card.Header>
      <Card.Body>
        <Card.Title className={aqiValueClassName}>AQI Value: {currentAqiData.aqi}</Card.Title>
        <Card.Subtitle className="mb-2 ">Category: {categoryDisplayName}</Card.Subtitle>
        <Card.Text>
          Last updated: {currentAqiData.updatedDateTime}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default AqiCityInfo