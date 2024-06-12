import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { expect } from 'vitest';

describe('App rendering', () => {
  it('should show My Location on first render', async () => {
    render(<App />);

    //first, No Data Available is shown because the api hasn't returned yet
    expect(screen.getByText("No Data Available")).toBeInTheDocument();

    // wait for the api to return and check AQI Value to validate AQI data is being displayed
    expect(await screen.findByText(/AQI Value/,{}, {timeout:4000})).toBeInTheDocument();

    //since the My Location is dynamic (based off of IP), can't assert any specific values
    //instead asserting that our 3 static locations are not displayed (aside from on their buttons)
    //combining that with the AQI check helps validate My Location from process of elimination
    //(admittedly this is a bit brittle - TODO improve with mocking)
    expect(screen.getAllByText(/Newark/).length).toBe(1);
    expect(screen.getAllByText(/London/).length).toBe(1);
    expect(screen.getAllByText(/San Diego/).length).toBe(1);

  });
});

describe('Clicking Location Buttons', () => {
  it('should show click London and show London', async () => {
    render(<App />);

    //first, No Data Available is shown because the api hasn't returned yet
    expect(screen.getByText("No Data Available")).toBeInTheDocument();

    // wait for the api to return and check AQI Value to validate AQI data is being displayed
    expect(await screen.findByText(/AQI Value/,{}, {timeout:4000})).toBeInTheDocument();

    // click the button
    await userEvent.click(screen.getByRole('button', {name: 'London'}));

    // London should be displayed both on the original button and now also in the AQI data
    expect(screen.getAllByText(/London/).length).toBe(2);
  });

  it('should show click Newark and show Newark', async () => {
    render(<App />);

    //first, No Data Available is shown because the api hasn't returned yet
    expect(screen.getByText("No Data Available")).toBeInTheDocument();

    // wait for the api to return and check AQI Value to validate AQI data is being displayed
    expect(await screen.findByText(/AQI Value/,{}, {timeout:4000})).toBeInTheDocument();

    // click the button
    await userEvent.click(screen.getByRole('button', {name: 'Newark'}));

    // Newark should be displayed both on the original button and now also in the AQI data
    expect(screen.getAllByText(/Newark/).length).toBe(2);
  });

  it('should show click San Diego and show San Diego', async () => {
    render(<App />);

    //first, No Data Available is shown because the api hasn't returned yet
    expect(screen.getByText("No Data Available")).toBeInTheDocument();

    // wait for the api to return and check AQI Value to validate AQI data is being displayed
    expect(await screen.findByText(/AQI Value/,{}, {timeout:4000})).toBeInTheDocument();

    // click the button
    await userEvent.click(screen.getByRole('button', {name: 'San Diego'}));

    // San Diego should be displayed both on the original button and now also in the AQI data
    expect(screen.getAllByText(/San Diego/).length).toBe(2);
  });

  it('should show click My Location and show My Location', async () => {
    render(<App />);

    //first, No Data Available is shown because the api hasn't returned yet
    expect(screen.getByText("No Data Available")).toBeInTheDocument();

    // wait for the api to return and check AQI Value to validate AQI data is being displayed
    expect(await screen.findByText(/AQI Value/,{}, {timeout:4000})).toBeInTheDocument();

    // My Location is the default so click a different button
    await userEvent.click(screen.getByRole('button', {name: 'San Diego'}));
    expect(screen.getAllByText(/San Diego/).length).toBe(2);

    //Now we can click the My Location button
    await userEvent.click(screen.getByRole('button', {name: 'My Location'}));

    //But since its dynamic, need to assert other cities aren't displayed, but AQI data is
    expect(screen.getByText(/AQI Value/)).toBeInTheDocument();

    expect(screen.getAllByText(/Newark/).length).toBe(1);
    expect(screen.getAllByText(/London/).length).toBe(1);
    expect(screen.getAllByText(/San Diego/).length).toBe(1);
  });
});