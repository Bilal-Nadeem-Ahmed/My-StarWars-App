<template>
  <v-app>
    <Header @toggle="drawer = !drawer" />
    <Drawer v-model="drawer" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/navigation/Header.vue'
import Footer from '@/components/navigation/Footer.vue'
import Drawer from '@/components/navigation/Drawer.vue'
const drawer = ref(false)
</script>
<style scoped lang="ts"></style>
