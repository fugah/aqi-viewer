This React app pulls data from a public API (https://aqicn.org/api/) to display Air Quality 
Index information for the user's location as well as 3 default locations. The styling is done 
using Bootstrap and is dynamic based off of the location's AQI. A refresh button is included, 
but the API generally only updates data once an hour.

## To set up the app:
1. Make sure you have node and npm installed
2. From the root folder, run "npm install"
3. Create a file called .env in the root folder
4. In the .env file, add the token for the AQI api: VITE_API_TOKEN = {TOKEN}

## To build the application locally:
1. Run "npm run dev" to start the app
2. Navigate to http://localhost:5173/ to view the app

## To run the tests:
 Run "npm run test"

As a side note, I chose Newark as one of the cities and then discovered that the station isn't updating its data.
I decided to keep it however because it gives a contrasting "Last updated" time.

I also included some of the planning documents I created before getting deep into code (AqiUIMockup.png and AqiViewerFlowchart.png)
