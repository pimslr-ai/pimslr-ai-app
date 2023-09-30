import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAppStorage() {
  async function get<T>(key: string): Promise<T> {
    try {
      const json = await AsyncStorage.getItem(key)
      return JSON.parse(json!) as T
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error)
      throw error
    }
  }

  async function set<T>(key: string, value: T): Promise<void> {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(key, json)
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error)
      throw error
    }
  }

  async function remove(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error)
      throw error
    }
  }

  return { get, set, remove }
}
