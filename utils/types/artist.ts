/*
 * Type that defines artist data
 */
export type Artist = {
  name: string
  dateAdded: Date
  lastUpdate: Date
  shortDescription: string
  longBio?: string
  workExamples: string[]
  contacts: {
    twitter?: string
    discord?: string
    email?: string
  }
  workCost: {
    preferredCurrency: string
    whenOne: number
    whenBatch: number
    comments?: string
  }
}
