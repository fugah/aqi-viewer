import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchAqiData } from '../../src/util/ApiFetcher';
import { expect, vi } from 'vitest';

describe('fetchAqiData', () => {
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

    it('should call each of its passed in callbacks once', async () => {
        const setLocationAqiDataArray = vi.fn();
        const setLastRefreshDateTime = vi.fn();

        await fetchAqiData(locations, setLocationAqiDataArray, setLastRefreshDateTime);

        expect(setLocationAqiDataArray).toHaveBeenCalledTimes(1);

        expect(setLastRefreshDateTime).toHaveBeenCalledTimes(1);
    });

    it('should set the locationAqiDataArray to the same number of elements as elements in the passed in locations', async () => {

        const setLocationAqiDataArray = vi.fn();
        const setLastRefreshDateTime = vi.fn();

        await fetchAqiData(locations, setLocationAqiDataArray, setLastRefreshDateTime);

        const passedInArray = setLocationAqiDataArray.mock.lastCall[0];
        expect(passedInArray.length).toBe(4);
    });
});