import { createContext, PropsWithChildren } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface StorageContextType {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
}

export const StorageContext = createContext<StorageContextType | null>(null)

export default ({ children }: PropsWithChildren) => {
  const get = async function <T>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key)
      return json ? (JSON.parse(json) as T) : null
    } catch (error) {
      console.error('Error fetching data from storage:', error)
      throw error
    }
  }

  const set = async function <T>(key: string, value: T) {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(key, json)
    } catch (error) {
      console.error('Error setting data in storage:', error)
      throw error
    }
  }

  const remove = async function (key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing data from storage:', error)
      throw error
    }
  }

  const contextValue: StorageContextType = {
    get,
    set,
    remove,
  }

  return <StorageContext.Provider value={contextValue}>{children}</StorageContext.Provider>
}
