export interface BanksApiQueryParams {
  bik?: string
}

import {IDefault} from "~/types/default.types";
export type IBankType = string


export interface IBank extends IDefault {
  actuality_date: string
  address: string
  bik: string
  city: string
  correspondent_account: string
  inn: string
  kpp: string
  name: string
  status: string
  treasury_accounts:null
  type: IBankType
}
