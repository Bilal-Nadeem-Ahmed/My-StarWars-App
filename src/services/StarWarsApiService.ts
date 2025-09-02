import type { IPerson } from '@/types/IPerson'
import axios, { type AxiosResponse } from 'axios'
const baseURL = 'https://swapi.info/api/'

export class StarWarsApiService {
  public async GetAllCharacters(): Promise<IPerson[]> {
    try {
      const response: AxiosResponse<IPerson[]> = await axios.get(`${baseURL}people`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch characters:', error)
      throw error
    }
  }
}
