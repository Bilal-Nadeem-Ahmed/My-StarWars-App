<template>
  <v-container fluid>
    <v-row v-if="isCharactersLoading">
      <v-col v-for="i in 12" :key="i" cols="12" sm="6" md="4">
        <v-card elevation="2">
          <v-skeleton-loader type="heading" class=""></v-skeleton-loader>
          <v-skeleton-loader type="text" class=""></v-skeleton-loader>

          <v-container class="pa-0">
            <v-row :dense="true">
              <v-col> <v-skeleton-loader type="text" class=""></v-skeleton-loader></v-col>
              <v-col> <v-skeleton-loader type="text" class=""></v-skeleton-loader></v-col>
            </v-row>
            <v-row :dense="true">
              <v-col> <v-skeleton-loader type="text" class=""></v-skeleton-loader></v-col>
              <v-col> <v-skeleton-loader type="text" class=""></v-skeleton-loader></v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else dense>
      <v-col v-for="character in sortedCharacters" :key="character.name" cols="12" sm="6" md="4">
        <v-card elevation="2">
          <v-card-title class="text-h6 d-flex justify-space-between align-center">
            {{ character.name }}
            <v-spacer></v-spacer>
            <svg-icon
              class="mr-2 favourite"
              type="mdi"
              :path="favouriteService.IsFavourite(character) ? mdiStar : mdiStarOutline"
              :size="20"
              @click="ToggleFavouriteStatus(character)"
            ></svg-icon>
            <v-chip small>{{ character.gender }}</v-chip>
          </v-card-title>

          <v-card-subtitle
            ><span>Birth Year: {{ character.birth_year }}</span>
            <span class="pl-2">Films: {{ character.films.length }}</span>
            <span v-if="character.films.length" class="pl-2"
              >Height: {{ character.height }} cm</span
            >
          </v-card-subtitle>

          <v-card-text>
            <v-container class="pa-0">
              <v-row :dense="true">
                <v-col class="text-caption">Mass: {{ character.mass }} kg</v-col>
                <v-col class="text-caption">Skin Color: {{ character.skin_color }}</v-col>
              </v-row>
              <v-row :dense="true">
                <v-col class="text-caption">Hair Color: {{ character.hair_color }}</v-col>
                <v-col class="text-caption">Eye Color: {{ character.eye_color }}</v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <!-- need to show more details of this character in another page  -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              rounded=""
              small
              text
              color="primary"
              :href="character.url"
              target="_blank"
            >
              View <svg-icon class="ml-2" type="mdi" :path="mdiArrowRight" :size="20"></svg-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { StarWarsApiService } from '@/services/StarWarsApiService'
import { FavouriteService } from '@/services/FavouriteService'
import { computed, onMounted, ref } from 'vue'
import { mdiArrowRight, mdiStarOutline, mdiStar } from '@mdi/js'
import type { ICharacter } from '@/types/ICharacter'

const service = new StarWarsApiService()
const favouriteService = new FavouriteService()

const isCharactersLoading = ref(false)
const characters = ref<ICharacter[]>([])
onMounted(() => {
  GetAllCharacters()
})

const GetAllCharacters = () => {
  isCharactersLoading.value = true
  service
    .GetAllCharacters()
    .then((chars) => {
      characters.value = chars.map((c) => ({
        ...c,
        favourite: favouriteService.IsFavourite(c),
      }))
    })
    .catch((error: Error) => {
      console.error(error.message)
    })
    .finally(() => {
      isCharactersLoading.value = false
    })
}

const sortedCharacters = computed(() => {
  return [...characters.value].sort((a, b) => {
    if (a.favourite && !b.favourite) return -1
    if (!a.favourite && b.favourite) return 1

    return a.name.localeCompare(b.name)
  })
})

const ToggleFavouriteStatus = (char: Icharacter): void => {
  favouriteService.ToggleFavourite(char)
  char.favourite = !char.favourite
}
</script>
<style lang="css">
.favourite {
  color: yellow;
  cursor: pointer;
}
</style>
