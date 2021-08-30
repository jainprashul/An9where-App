import { useState } from "react";
import Storage from "./Storage";

// Hook
export function useStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState( async () => {
        try {
            // Get from storage by key
            const item = await Storage.getValue(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.error(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to Storage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to storage
            Storage.setValue(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.error(error);
        }
    };

    return [storedValue, setValue];
}


export function getFromApi(api_url) {
    return fetch(api_url)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
        // rerun if failed to fetch
        getFromApi(api_url);
      });
  };