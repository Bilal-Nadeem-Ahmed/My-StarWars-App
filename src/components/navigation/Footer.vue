<template>
  <v-footer color="primary" height="50" class="justify-center" :app="true" border
    ><span>
      <img
        style="vertical-align: middle"
        src="/assets/logo.png"
        alt="Logo"
        class="mx-2"
        height="28"
      />
      Character App</span
    >
    <v-snackbar
      v-model="snackBarStore.$state.snackbar"
      :timeout="snackBarStore.$state.timeout"
      :color="snackBarStore.$state.color"
      elevation="24"
    >
      <div class="text-subtitle-1 text-center">
        {{ snackBarStore.$state.message }}
      </div>
    </v-snackbar>
  </v-footer>
</template>
<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbarStore.ts'
const snackBarStore = useSnackbarStore()
</script>
