import React from 'react';

export const useBrowserDatabase = () => {
    const setItem = (data, location, expiration) => {
        localStorage.setItem(location, JSON.stringify({
            data,
            expiration,
            createdAt: Date.now()
        }));
    };

    const getItem = (location) => {
        try {
            const entryObject = JSON.parse(localStorage.getItem(location));
            const { data, expiration, createdAt } = entryObject;
            const MILLISECONDS_TO_SECONDS = 1000;

            if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
                localStorage.removeItem(location);
                return null;
            }

            return data;
        } catch {
            return null;
        }
    };

    const deleteItem = (location) => {
        localStorage.removeItem(location);
    };

    return {
        setItem,
        getItem,
        deleteItem
    }
}
