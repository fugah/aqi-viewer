import Button from 'react-bootstrap/Button';

/*
Component for the button used to change the location to view
*/
function LocationButton({ location, selectedLocation, handleClick }) {
  return (
    <Button 
    variant={selectedLocation === location.cityApiName ? "info" : "primary"} 
    onClick={handleClick}>
      {location.locationDisplayName}
    </Button>
  )
}

export default LocationButton