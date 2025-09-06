<template>
  <v-container fluid>
    <v-row v-if="characterStore.isLoading">
      <v-col v-for="i in 12" :key="i" cols="12" sm="6" md="4">
        <v-card elevation="2">
          <v-skeleton-loader type="heading" class=""></v-skeleton-loader>
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
        <v-card :ripple="true" @click="ViewDetails(character)" elevation="2">
          <v-card-title class="text-h6 d-flex justify-space-between align-center">
            {{ character.name }}
            <v-spacer></v-spacer>
            <svg-icon
              class="mr-2 favourite"
              type="mdi"
              :path="character.favourite ? mdiStar : mdiStarOutline"
              :size="20"
              @click.stop="characterStore.ToggleFavouriteStatus(character)"
            ></svg-icon>
            <v-chip color="red" small>{{ character.gender }}</v-chip>
          </v-card-title>

          <v-card-text>
            <v-container class="pa-0">
              <v-row :dense="true">
                <v-col class="text-caption">Birth Year: {{ character.birth_year }}</v-col>
                <v-col class="text-caption">Films: {{ character.films.length }}</v-col>
              </v-row>
              <v-row :dense="true">
                <v-col class="text-caption">Hair Color: {{ character.hair_color }}</v-col>
                <v-col class="text-caption">Eye Color: {{ character.eye_color }}</v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="tonal"
              :rounded="true"
              density="compact"
              text
              color="yellow"
              @click.stop="OnReviewCharacterClicked(character)"
            >
              Review
              <svg-icon class="ml-2" type="mdi" :path="mdiMessageDraw" :size="16"></svg-icon>
            </v-btn>
            <v-btn
              variant="outlined"
              :rounded="true"
              density="compact"
              text
              color="primary"
              @click="ViewDetails(character)"
            >
              View
              <svg-icon class="ml-2" type="mdi" :path="mdiArrowRight" :size="16"></svg-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <ReviewDialog v-model="shouldDisplayReviewDialog" :character="selectedCharacter" />
  </v-container>
</template>
<script setup lang="ts">
import { useCharacterStore } from '@/stores/characterStore'
import { computed, onMounted } from 'vue'
import { mdiArrowRight, mdiStarOutline, mdiStar, mdiMessageDraw } from '@mdi/js'
import type { ICharacter } from '@/types/ICharacter'
import { StringService } from '@/services/StringService'
import { useRouter } from 'vue-router'
import ReviewDialog from '@/components/ReviewDialog.vue'
import { ref } from 'vue'
const characterStore = useCharacterStore()
const stringService = new StringService()
const router = useRouter()
const shouldDisplayReviewDialog = ref(false)
const selectedCharacter = ref<ICharacter>()

onMounted(() => {
  characterStore.LoadCharacters()
})

const sortedCharacters = computed(() => {
  return [...characterStore.characters].sort((a, b) => {
    if (a.favourite && !b.favourite) return -1
    if (!a.favourite && b.favourite) return 1

    return a.name.localeCompare(b.name)
  })
})

const ViewDetails = (character: ICharacter): void => {
  router.push({
    name: 'Details',
    params: { id: stringService.GetIdFromUrl(character.url) },
  })
}

const OnReviewCharacterClicked = (char: ICharacter): void => {
  shouldDisplayReviewDialog.value = true
  selectedCharacter.value = char
}
</script>
<style lang="css">
.favourite {
  color: yellow;
  cursor: pointer;
}
</style>
