
export interface PositionsApiQueryParams {
  page?: number,
  perPage?: number
}


export interface PositionsApiPayload {
  id?: number
  code?: string,
  name: string,
  type?: string,
  check_number?: number,
  okz?: number,
  category?: null,
  ekts?: string,
  range_ranks?: string
}

export interface PositionsApiSearchQueryParams {
  name: string
}
