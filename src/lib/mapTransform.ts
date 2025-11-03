// src/lib/support/mapTransform.ts
type HospitalApi = {
  hospital_id: number
  hospital_name: string
  hospital_area?: string
  hospital_address?: string
  hospital_phone?: string
  hospital_email?: string
  hospital_contact_person_name?: string
  hospital_contact_person_mobile_no?: string
  hospital_contact_person_email?: string
  benefit_details?: string
  cashless_status?: string
}

const toIframe = (addr?: string) => {
  const q = encodeURIComponent((addr ?? '').trim() || 'Bangladesh')
  return `<iframe src='https://www.google.com/maps?q=${q}&output=embed' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>`
}

export const toSupportTabHospitals = (rows: HospitalApi[]) =>
  rows.map((h) => ({
    // what your UI expects:
    office_location_Label: h.hospital_area
      ? `${h.hospital_name}, ${h.hospital_area}`
      : h.hospital_name,
    office_name: h.hospital_contact_person_name || '',
    office_location: toIframe(h.hospital_address),
    office_address: h.hospital_address || '',
    office_email:
      [h.hospital_email, h.hospital_contact_person_email]
        .filter(Boolean)
        .map(s => String(s).trim())
        .join('; ') || '',
    office_phone:
      [h.hospital_phone, h.hospital_contact_person_mobile_no]
        .filter(Boolean)
        .map(s => String(s).trim())
        .join(', ') || '',
    discount_details: h.benefit_details || '',
    cashless_status: h.cashless_status || '',
  }))
