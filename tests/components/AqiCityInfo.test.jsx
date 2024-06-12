import * as React from 'react';
import { render, screen } from '@testing-library/react';

import AqiCityInfo from '../../src/components/AqiCityInfo';

describe('AqiCityInfo displays the data passed in', () => {
  it('shows the AQI data when it is valid', () => {
    const givenData = {
      cityKeyName: "city",
      aqi: 20,
      cityFullName: "cityFullName",
      updatedDateTime: "9/26/2022, 7:00:00 AM",
    }

    render(<AqiCityInfo currentAqiData={givenData} />);

    expect(screen.getByText("AQI Value: 20")).toBeInTheDocument();
    expect(screen.getByText("Category: Good")).toBeInTheDocument();
    expect(screen.getByText("Last updated: 9/26/2022, 7:00:00 AM")).toBeInTheDocument();
    expect(screen.getByText("cityFullName")).toBeInTheDocument();

  });

  it('shows No Data Available when data is undefined', () => {
    const givenData = undefined

    render(<AqiCityInfo currentAqiData={givenData} />);

    expect(screen.getByText("No Data Available")).toBeInTheDocument();

  });

  it('shows No Data Available when data is null', () => {
    const givenData = null

    render(<AqiCityInfo currentAqiData={givenData} />);

    expect(screen.getByText("No Data Available")).toBeInTheDocument();

  });

  it('shows No Data Available when data is empty object', () => {
    const givenData = {}

    render(<AqiCityInfo currentAqiData={givenData} />);

    expect(screen.getByText("No Data Available")).toBeInTheDocument();

  });

  it('shows Error Message when data is an error', () => {
    const givenData = {
      cityKeyName: "Bad Town",
      errorMessage: "Errors are bad"
    }

    render(<AqiCityInfo currentAqiData={givenData} />);

    expect(screen.getByText("Error: Errors are bad")).toBeInTheDocument();

  });
});

describe('AqiCityInfo determines the correct category based off the aqi value', () => {
  let givenData = {
    cityKeyName: "city",
    aqi: 20,
    cityFullName: "cityFullName",
    updatedDateTime: "9/26/2022, 7:00:00 AM",
  }

  const goodValues = [0, 20, 50]
  const moderateValues = [51, 70, 100]
  const sensitiveValues = [101, 120, 150]
  const unhealthyValues = [151, 180, 200]
  const veryUnhealthyValues = [201, 270, 300]
  const hazardousValues = [301, 330, 1550]
  const invalidValues = [-5, "kl"]

  goodValues.forEach((value => {
    it('displays good', () => {
      givenData.aqi = value
      render(<AqiCityInfo currentAqiData={givenData} />);
      expect(screen.getByText("Category: Good")).toBeInTheDocument();
    });
  }));

  moderateValues.forEach((value => {
    it('displays moderate', () => {
      givenData.aqi = value
      render(<AqiCityInfo currentAqiData={givenData} />);
      expect(screen.getByText("Category: Moderate")).toBeInTheDocument();
    });
  }));

  sensitiveValues.forEach((value => {
    it('displays sensitive', () => {
      givenData.aqi = value
      render(<AqiCityInfo currentAqiData={givenData} />);
      expect(screen.getByText("Category: Unhealthy for Sensitive Groups")).toBeInTheDocument();
    });
  }));

  unhealthyValues.forEach((value => {
    it('displays unhealthy', () => {
      givenData.aqi = value
      render(<AqiCityInfo currentAqiData={givenData} />);
      expect(screen.getByText("Category: Unhealthy")).toBeInTheDocument();
    });
  }));

  veryUnhealthyValues.forEach((value => {
    it('displays very unhealthy', () => {
      givenData.aqi = value
      render(<AqiCityInfo currentAqiData={givenData} />);
      expect(screen.getByText("Category: Very Unhealthy")).toBeInTheDocument();
    });
  }));

  hazardousValues.forEach((value => {
    it('displays hazardous', () => {
      givenData.aqi = value
      render(<AqiCityInfo currentAqiData={givenData} />);
      expect(screen.getByText("Category: Hazardous")).toBeInTheDocument();
    });
  }));

  invalidValues.forEach((value => {
    it('displays Invalid', () => {
      givenData.aqi = value
      render(<AqiCityInfo currentAqiData={givenData} />);
      expect(screen.getByText("Category: Invalid AQI Value")).toBeInTheDocument();
    });
  }));
});