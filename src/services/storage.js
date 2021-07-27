import { AsyncStorage } from 'react-native';


export async function setItem(key, value) {
        try {
            let keys = (await AsyncStorage.getAllKeys());

            if(keys.indexOf(key) > -1)
                await AsyncStorage.mergeItem(key, JSON.stringify(value));
            else
                await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
};

export async function getItem(key) {
        let value = {value: ''};
        try {
            value = await AsyncStorage.getItem(key);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }

        return JSON.parse(value);
};
