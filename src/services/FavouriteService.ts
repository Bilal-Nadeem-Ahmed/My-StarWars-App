import type { ICharacter } from '@/types/ICharacter'
const key = 'favouriteCharacters'

export class FavouriteService {
  public GetFavourites(): string[] {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  }

  public IsFavourite(character: ICharacter): boolean {
    return this.GetFavourites().includes(character.url)
  }

  public ToggleFavourite(character: ICharacter): void {
    const favourites = this.GetFavourites()
    const index = favourites.indexOf(character.url)

    if (index >= 0) {
      favourites.splice(index, 1)
    } else {
      favourites.push(character.url)
    }

    localStorage.setItem(key, JSON.stringify(favourites))
  }
}
