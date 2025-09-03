<template>
  <v-container class="d-flex justify-center py-8">
    <v-card v-if="characterStore.isLoading" elevation="3" width="500" class="pa-4">
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
    <v-card v-else elevation="3" width="500" class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <svg-icon
          @click="router.push({ name: 'Home' })"
          type="mdi"
          :path="mdiArrowLeft"
          :size="24"
          class="back-button"
        ></svg-icon>
        <span class="text-h5">{{ character?.name || 'Loading...' }}</span>
        <svg-icon
          v-if="character"
          class="favourite"
          type="mdi"
          :path="character.favourite ? mdiStar : mdiStarOutline"
          :size="24"
          @click.stop="characterStore.ToggleFavouriteStatus(character)"
        ></svg-icon>
      </v-card-title>

      <v-card-text v-if="character">
        <v-container class="pa-0">
          <v-row>
            <v-col class="text-caption">Gender: {{ character.gender }}</v-col>
            <v-col class="text-caption">Birth Year: {{ character.birth_year }}</v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption">Height: {{ character.height }} cm</v-col>
            <v-col class="text-caption">Mass: {{ character.mass }} kg</v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption">Eye Color: {{ character.eye_color }}</v-col>
            <v-col class="text-caption">Hair Color: {{ character.hair_color }}</v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption">Skin Color: {{ character.skin_color }}</v-col>
            <v-col class="text-caption">Films: {{ character.films.length }}</v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption">Vehicles: {{ character.vehicles.length }}</v-col>
            <v-col class="text-caption">Starships: {{ character.starships.length }}</v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption"
              >Created On: {{ new Date(character.created).toLocaleDateString() }}</v-col
            >
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import { mdiStarOutline, mdiStar, mdiArrowLeft } from '@mdi/js'

const route = useRoute()
const router = useRouter()
const characterStore = useCharacterStore()

const id = route.params.id as string

onMounted(async () => {
  characterStore.LoadCharacters()
})

const character = computed(() =>
  characterStore.characters.find((char) => {
    const parts = char.url.split('/')
    const characterId = parts[parts.length - 1]
    return characterId === id
  }),
)
</script>

<style scoped lang="css">
.favourite {
  color: yellow;
  cursor: pointer;
}
.back-button {
  color: #2196f3;
  cursor: pointer;
}
.back-button:hover {
  color: #10498d;
  cursor: pointer;
}
</style>
