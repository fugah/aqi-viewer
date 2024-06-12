import Button from 'react-bootstrap/Button';

/*
  Component for the button to refresh the data and display the
  time last refreshed
*/
function RefreshButton({ refreshDateTime, handleClick }) {
  return (
    <div className="row mb-2">
      <div className="col-4">
        <Button id="refresh-data" onClick={handleClick}>Refresh</Button>
      </div>
      <div className="col-8 text-end align-text-bottom">
        Last refreshed: {refreshDateTime}
      </div>
    </div>
  )
}
export default RefreshButton