
export type FileTypes = string | "lectures" | "audio_lectures" | "video_lectures" | "methodological_materials" // ...

export interface FilesApiPayload {
  id: number
  name: string | null
  collection: FileTypes
  url: string | null
  size: number | null
  // size_optimized: number | null
  // order: number | null
  // mime_type: string
  // md5_original: string
  // md5_optimized: string
  created_at?: Date
}
