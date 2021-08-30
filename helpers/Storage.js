import AsyncStorage from "@react-native-async-storage/async-storage";

const getValue = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        // read error
        console.error(e);
    }
}

const getObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // read error
        console.error(e);
    }
    console.log('Done.')
}

const setValue = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // read error
        console.error(e);
    }
}

const setObject = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        // read error
        console.error(e);
    }
}

const removeValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // read error
        console.error(e);
    }
}

const clearALL = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // read error
        console.error(e);
    }
}

const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys()
    } catch (e) {
        // read error
        console.error(e);
    }
}

const getMultipleValues = async (keys) => {
    try {
        return await AsyncStorage.multiGet(keys)
    } catch (e) {
        // read error
        console.error(e);
    }
}   // getMultipleValues

const getMultipleObjects = async (keys) => {
    try {
        const jsonValues = await AsyncStorage.multiGet(keys)
        return jsonValues.map(value => JSON.parse(value[1]))
    } catch (e) {
        // read error
        console.error(e);
    }
}   // getMultipleObjects

/**
 * @param {string} input [key, value]
 * @returns {Promise<void>}  
 */
const setMultipleValues = async (keyValuePairs) => {
    try {
        await AsyncStorage.multiSet(keyValuePairs)
    } catch (e) {
        // read error
        console.error(e);
    }
}   // setMultipleValues  

const setMutipleObjects = async (keyValuePairs) => {
    try {
        const jsonValues = keyValuePairs.map(value => JSON.stringify(value))
        await AsyncStorage.multiSet(jsonValues)
    } catch (e) {
        // read error
        console.error(e);
    }
}   // setMultipleObjects

const removeMultipleValues = async (keys) => {
    try {
        await AsyncStorage.multiRemove(keys)
    } catch (e) {
        // read error
        console.error(e);
    }
}   // removeMultipleValues


const Storage = {
    getValue,
    getObject,
    setValue,
    setObject,
    removeValue,
    clearALL,
    getAllKeys,
    getMultipleValues,
    getMultipleObjects,
    setMultipleValues,
    setMutipleObjects,
    removeMultipleValues
}

export default Storage

