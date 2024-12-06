<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLicensePlatesStore } from '@/lib/store'
import { licensePlateValidator } from '@/lib/util'

const licensePlatesStore = useLicensePlatesStore()
const editingId = ref<number | null>(null)
const editText = ref('')

onMounted(async () => {
  console.log('onMounted')
  await licensePlatesStore.fetchLicensePlates()
})

const startEdit = (id: number, currentValue: string) => {
  editingId.value = id
  editText.value = currentValue
}

const handleUpdate = async (id: number) => {
  if (!licensePlateValidator(editText.value)) {
    alert('Invalid license plate')
    return
  }

  await licensePlatesStore.updateLicensePlate(id, editText.value)
  editingId.value = null
  editText.value = ''
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this license plate?')) {
    await licensePlatesStore.deleteLicensePlate(id)
  }
}
</script>

<template>
  <div>
    <h1>License Plates</h1>
    <ul>
      <li v-for="licensePlate in licensePlatesStore.licensePlates" :key="licensePlate.id">
        <template v-if="editingId === licensePlate.id">
          <input type="text" v-model="editText" @keyup.enter="handleUpdate(licensePlate.id)" />
          <button @click="handleUpdate(licensePlate.id)">Save</button>
          <button @click="editingId = null">Cancel</button>
        </template>
        <template v-else>
          {{ licensePlate.licensePlate }}
          <button @click="startEdit(licensePlate.id, licensePlate.licensePlate)">Edit</button>
          <button @click="handleDelete(licensePlate.id)">Delete</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

button {
  margin-left: 8px;
}
</style>
