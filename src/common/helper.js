import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    console.log(e);
  }
};

const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export default {
  storeData,
  getData,
  clearData,
};
