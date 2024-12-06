import type { Database } from './database.types'

export const transformSingleData = (
  data: Database['public']['Tables']['license_plates']['Row'],
) => {
  return {
    id: data.id,
    licensePlate: data.license_plate,
    createdAt: data.created_at!,
    updatedAt: data.updated_at!,
  }
}

export const transformData = (data: Database['public']['Tables']['license_plates']['Row'][]) => {
  return data.map((item) => ({
    id: item.id,
    licensePlate: item.license_plate,
    createdAt: item.created_at!,
    updatedAt: item.updated_at!,
  }))
}

export const licensePlateValidator = (licensePlateTxt: string) => {
  const regex = /[A-Z0-9]{1,3}\-[A-Z]{1,2} [A-Z0-9]{1,4}$/g

  return regex.test(licensePlateTxt.trim().toUpperCase())
}
