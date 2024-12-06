<script setup lang="ts">
import { ref } from 'vue'
import { licensePlateValidator } from '@/lib/util'
import { useLicensePlatesStore } from '@/lib/store'

const licensePlatesStore = useLicensePlatesStore()

const licensePlateTxt = ref('')

const handleSubmit = async () => {
  const isValid = licensePlateValidator(licensePlateTxt.value)
  console.log(isValid)
  if (!isValid) {
    alert('Invalid license plate')
    return
  }

  await licensePlatesStore.createLicensePlate(licensePlateTxt.value)
}
</script>

<template>
  <div>
    <h1>Add license plate</h1>

    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="licensePlateTxt" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 0.5rem;
}

form {
  display: flex;
  gap: 0.5rem;
}
</style>
