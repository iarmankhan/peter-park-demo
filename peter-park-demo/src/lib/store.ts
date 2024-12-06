import { defineStore } from 'pinia'
import * as licensePlatesApi from './api'

interface LicensePlate {
  id: number
  licensePlate: string
  createdAt: string
  updatedAt: string
}

interface LicensePlatesStore {
  licensePlates: LicensePlate[]
}

export const useLicensePlatesStore = defineStore('licensePlates', {
  state: (): LicensePlatesStore => ({
    licensePlates: [],
  }),

  actions: {
    async fetchLicensePlates() {
      const licensePlates = await licensePlatesApi.fetchLicensePlates()
      console.log(licensePlates)
      this.licensePlates = licensePlates
    },

    async createLicensePlate(licensePlateTxt: string) {
      const licensePlate = await licensePlatesApi.createLicensePlate(licensePlateTxt)

      if (!licensePlate) {
        alert('Failed to create license plate')
        return
      }

      this.licensePlates.push(licensePlate)
    },

    async updateLicensePlate(id: number, licensePlateTxt: string) {
      const updatedPlate = await licensePlatesApi.updateLicensePlate(id, licensePlateTxt)

      if (!updatedPlate) {
        alert('Failed to update license plate')
        return
      }

      const index = this.licensePlates.findIndex((plate) => plate.id === id)
      if (index !== -1) {
        this.licensePlates[index] = updatedPlate
      }
    },

    async deleteLicensePlate(id: number) {
      const success = await licensePlatesApi.deleteLicensePlate(id)

      if (!success) {
        alert('Failed to delete license plate')
        return
      }

      this.licensePlates = this.licensePlates.filter((plate) => plate.id !== id)
    },
  },
})
