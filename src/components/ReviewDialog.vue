<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card v-if="character?.name">
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Review: {{ character.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon :icon="mdiClose"></v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-form ref="reviewFormRef" v-model="valid" lazy-validate>
          <v-container class="">
            <v-row>
              <v-col class="">
                <v-text-field
                  v-model="reviewer"
                  density="compact"
                  variant="outlined"
                  label="Your Name"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Reviewer is required']"
                  validate-on="submit"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="">
                <v-menu
                  v-model="shouldDisplayDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  location="bottom"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="watchedDateFormatted"
                      density="compact"
                      variant="outlined"
                      label="Date Watched"
                      :readonly="true"
                      hide-details="auto"
                      :rules="[(v) => !!v || 'Watched Date is required']"
                      validate-on="submit"
                      clearable
                    />
                  </template>

                  <v-date-picker
                    v-model="watchedDate"
                    color="primary"
                    :max="new Date().toISOString()"
                    :min="character?.created"
                    show-adjacent-months
                    @update:modelValue="shouldDisplayDatePicker = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="">
                <v-textarea
                  v-model="text"
                  label="Your Review"
                  rows="4"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Review is required']"
                  validate-on="submit"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="">
                <div class="d-flex align-center">
                  <span class="mr-2">Rating:</span>
                  <span v-for="i in 10" :key="i" icon small @click="rating = i">
                    <v-icon :icon="i <= rating ? mdiStar : mdiStarOutline" color="yellow" />
                  </span>
                  <span class="ml-2">{{ rating }}/10</span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="submitReview">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ICharacter } from '@/types/ICharacter'
import { mdiStar, mdiStarOutline, mdiClose } from '@mdi/js'
import { StringService } from '@/services/StringService'
import type { IReview } from '@/types/IReview'
import { StarWarsApiService } from '@/services/StarWarsApiService'

interface Props {
  character?: ICharacter
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const stringService = new StringService()
const apiService = new StarWarsApiService()
const dialog = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => (dialog.value = val),
)
watch(dialog, (val) => emit('update:modelValue', val))

const reviewFormRef = ref()
const valid = ref(false)
const reviewer = ref('')
const watchedDate = ref<string | null>(null)
const text = ref('')
const rating = ref(0)
const shouldDisplayDatePicker = ref(false)
const closeDialog = (): void => {
  dialog.value = false
  emit('update:modelValue', false)
}

const watchedDateFormatted = computed({
  get: () => (watchedDate.value ? new Date(watchedDate.value).toLocaleDateString() : ''),
  set: (val: string) => {
    watchedDate.value = val ? new Date(val).toISOString().substring(0, 10) : null
  },
})

const submitReview = async () => {
  const { valid: isValid } = await reviewFormRef.value.validate()
  if (!isValid) return

  const review: IReview = {
    characterId: parseInt(stringService.GetIdFromUrl(props.character!.url)),
    reviewer: reviewer.value,
    text: text.value,
    rating: rating.value,
    createdAt: new Date().toISOString(),
    watchedDate: watchedDate.value ?? '',
  }

  apiService.SubmitReview(review)

  reviewer.value = ''
  text.value = ''
  rating.value = 0
  watchedDate.value = ''
  closeDialog()
}
</script>
