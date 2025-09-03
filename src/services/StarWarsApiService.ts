import type { ICharacter } from '@/types/ICharacter'
import axios, { type AxiosResponse } from 'axios'
import { useSnackbarStore } from '@/stores/snackbarStore'
import type { IReview } from '@/types/IReview'
const baseURL = 'https://swapi.info/api/'

export class StarWarsApiService {
  private snackbar = useSnackbarStore()
  public async GetAllCharacters(): Promise<ICharacter[]> {
    try {
      const response: AxiosResponse<ICharacter[]> = await axios.get(`${baseURL}people`)
      return response.data
    } catch (error) {
      const errorMessage = 'Failed to fetch characters'
      console.error(errorMessage, error)
      this.snackbar.showSnackbar(errorMessage, 'red', 3000)
      return []
    }
  }

  public async SubmitReview(review: IReview): Promise<IReview> {
    try {
      const response: AxiosResponse<IReview> = await axios.post(`${baseURL}review`, review)
      this.snackbar.showSnackbar('Review added successfully', 'primary', 3000)
      return response.data
    } catch (error) {
      const errorMessage = 'Unable to Post Review'
      console.error(errorMessage, error)
      this.snackbar.showSnackbar(errorMessage, 'red', 3000)
      return {} as IReview
    }
  }
}
