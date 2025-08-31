<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.value"
        :to="item.value"
        link
        :active="$route.path === item.value"
        @click="CloseDrawer"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const drawer = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const CloseDrawer = () => {
  emit('update:modelValue', false)
}

const items = [
  { title: 'Home', value: '/' },
  { title: 'About', value: '/about' },
]
</script>
