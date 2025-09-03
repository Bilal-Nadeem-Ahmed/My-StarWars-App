import { defineStore } from 'pinia'

export interface SnackbarState {
  snackbar: boolean
  message: string
  color: string
  timeout: number
}

export const useSnackbarStore = defineStore('snackbar', {
  state: (): SnackbarState => ({
    snackbar: false,
    message: '',
    color: 'primary',
    timeout: 3000,
  }),
  actions: {
    showSnackbar(message: string, color: string, timeout: number = 3000) {
      this.snackbar = true
      this.message = message
      this.color = color
      this.timeout = timeout

      setTimeout(() => {
        this.snackbar = false
        this.message = ''
        this.color = 'primary'
      }, timeout)
    },
  },
})
