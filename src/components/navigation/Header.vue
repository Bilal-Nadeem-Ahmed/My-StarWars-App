<template>
  <v-app-bar color="primary" :elevation="2" density="compact" class="d-flex align-center">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="Toggle"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title
      >My<img
        style="vertical-align: middle"
        src="/assets/logo.png"
        alt="Logo"
        class="mx-2"
        height="28"
      />
      App - {{ $router.currentRoute.value.name }}</v-app-bar-title
    >
    <v-spacer />
    <v-switch density="compact" :hide-details="true" @click="theme.toggle()" class="pr-4">
      <template #prepend>
        <v-icon icon="mdi-domain" color="yellow-darken-2"> {{}} </v-icon>
        <svg-icon
          type="mdi"
          style="color: yellow"
          :path="theme.name.value === 'dark' ? mdiWeatherNight : mdiWeatherSunny"
          :size="20"
        ></svg-icon>
      </template>
    </v-switch>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js'

const emit = defineEmits(['toggle'])

const Toggle = () => {
  emit('toggle')
}

const theme = useTheme()
</script>
