
export type CounterpartyType = "legal" | "individual" | ""

export interface CounterpartiesApiPayload {
  name: string
  name_full: string
  manager_id: string
  management_name?: string
  management_position?: string
  postal_code: string
  city: string
  address: string
  address_post?: string
  address_legal?: string
  email: string
  type: CounterpartyType
  inn: string
  kpp: string
  ogrn: string
  okpo?: string
  okato?: string
  oktmo?: string
  okogu?: string
  okfs?: string
}

export interface CounterpartiesApiQueryParams {
  page?: number,
  perPage?: number
}

export interface CounterpartiesApiSearchQueryParams {
  name?: string
  inn?: number | string
}

export interface CounterpartiesApiSearchDaDataQueryParams {
  inn: number | string
}


