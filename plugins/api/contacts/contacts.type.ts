
export type ContactType = "address" | "email" | "phone" | "link"

export interface ContactsApiPayload {
  title: string
  type: ContactType
  contact: string
}
