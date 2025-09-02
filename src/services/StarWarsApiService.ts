import type { ICharacter } from '@/types/ICharacter'
import axios, { type AxiosResponse } from 'axios'
const baseURL = 'https://swapi.info/api/'

export class StarWarsApiService {
  public async GetAllCharacters(): Promise<ICharacter[]> {
    try {
      const response: AxiosResponse<ICharacter[]> = await axios.get(`${baseURL}people`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch characters:', error)
      throw error
    }
  }
}
