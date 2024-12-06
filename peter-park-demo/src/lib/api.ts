import supabase from './supabase'
import { transformData, transformSingleData } from './util'

export const fetchLicensePlates = async () => {
  const { data, error } = await supabase.from('license_plates').select('*')

  if (error) {
    // throw error
    console.error(error)
    return []
  }

  return transformData(data)
}

export const createLicensePlate = async (licensePlate: string) => {
  const { data, error } = await supabase
    .from('license_plates')
    .insert({ license_plate: licensePlate })
    .select('*')
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return transformSingleData(data)
}

export const updateLicensePlate = async (id: number, licensePlate: string) => {
  const { data, error } = await supabase
    .from('license_plates')
    .update({ license_plate: licensePlate })
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return transformSingleData(data)
}

export const deleteLicensePlate = async (id: number) => {
  const { error } = await supabase.from('license_plates').delete().eq('id', id)

  if (error) {
    console.error(error)
    return false
  }

  return true
}
