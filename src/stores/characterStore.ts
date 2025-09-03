import { defineStore } from 'pinia'
import { ref } from 'vue'
import { StarWarsApiService } from '@/services/StarWarsApiService'
import { FavouriteService } from '@/services/FavouriteService'
import type { ICharacter } from '@/types/ICharacter'
import { useSnackbarStore } from './snackbarStore'

export const useCharacterStore = defineStore('characterStore', () => {
  const service = new StarWarsApiService()
  const favouriteService = new FavouriteService()
  const snackbarStore = useSnackbarStore()
  const characters = ref<ICharacter[]>([])
  const isLoading = ref(false)
  const hasLoaded = ref(false)

  const LoadCharacters = async () => {
    if (hasLoaded.value) return

    isLoading.value = true
    await service
      .GetAllCharacters()
      .then((chars) => {
        characters.value = chars.map((c) => ({
          ...c,
          favourite: favouriteService.IsFavourite(c),
        }))
      })
      .catch((error: Error) => {
        console.error('Failed to load characters:', error.message)
      })
      .finally(() => {
        isLoading.value = false
        hasLoaded.value = true
      })
  }

  const GetCharacterById = async (id: string | number): Promise<ICharacter | undefined> => {
    if (!hasLoaded.value) {
      await LoadCharacters()
    }
    return characters.value.find((c) => {
      const parts = c.url.split('/')
      const charId = parts[parts.length - 1]
      return String(charId) === String(id)
    })
  }

  const ToggleFavouriteStatus = (char: ICharacter): void => {
    favouriteService.ToggleFavourite(char)
    char.favourite = !char.favourite
    const snackbarString = `${char.favourite ? 'Saved' : 'Removed'} ${char.name} ${char.favourite ? 'to' : 'from'} favourites`
    snackbarStore.showSnackbar(snackbarString, 'primary', 3000)
  }

  return {
    characters,
    isLoading,
    LoadCharacters,
    GetCharacterById,
    ToggleFavouriteStatus,
  }
})
