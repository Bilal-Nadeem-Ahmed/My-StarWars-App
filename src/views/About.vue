<template>
  <v-container class="pa-4" fluid>
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="display-1 font-weight-bold mb-2">About Star Wars Characters App</h1>
        <p class="subtitle-1">
          Explore your favorite Star Wars characters, mark them as favourites, and add your personal
          reviews!
        </p>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="4" class="d-flex">
        <v-card outlined class="pa-4 text-center flex-grow-1">
          <svg-icon :path="mdiAccountGroup" size="48" color="#FFD700"></svg-icon>
          <h3 class="headline">Characters</h3>
          <p class="body-2">
            Browse a wide range of Star Wars characters from the official API with detailed
            information including height, mass, eye color, hair, and more.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="d-flex">
        <v-card outlined class="pa-4 text-center flex-grow-1">
          <svg-icon :path="mdiStar" size="48" color="#FF0000"></svg-icon>
          <h3 class="headline">Favourites</h3>
          <p class="body-2">
            Mark characters as your favourites. Your favourite characters are saved locally and
            always appear at the top of the list for quick access.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="d-flex">
        <v-card outlined class="pa-4 text-center flex-grow-1">
          <svg-icon :path="mdiPencil" size="48" color="#1E90FF"></svg-icon>
          <h3 class="headline">Reviews</h3>
          <p class="body-2">
            Share your thoughts and reviews about your favorite characters. Add, edit, or delete
            your reviews anytime.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-8">
      <v-col cols="12" md="6" class="text-center">
        <v-btn color="primary" class="mx-2" :to="{ name: 'Home' }"> Browse Characters </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-12">
      <v-col cols="12" md="4" class="text-center">
        <v-img src="/assets/logo.png" alt="Star Wars Logo" contain height="120"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountGroup, mdiStar, mdiPencil } from '@mdi/js'
</script>
