import { useEffect, useState } from 'react'
import { NativeEventEmitter } from 'react-native'
import useAppStorage from './use-app-storage'

const emitter = new NativeEventEmitter()

export default function useAppData<T>(key: string, initialValue?: T) {
  const [data, setData] = useState<T | null | undefined>(initialValue)
  const { get, set, remove } = useAppStorage()

  useEffect(() => {
    get<T>(key).then(setData)
  }, [])

  emitter.addListener('set:' + key, setData)
  emitter.addListener('remove:' + key, () => setData(null))

  const set_ = async (value: T) => {
    await set<T>(key, value)
    emitter.emit('set:' + key, value)
  }

  const remove_ = async () => {
    await remove(key)
    emitter.emit('remove:' + key, data)
  }

  return { data, set: set_, remove: remove_ }
}
