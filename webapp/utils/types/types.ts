export type AnimationsIdMap = {
  supportedId: string
  animations: Animation[]
}

export type Animation = {
  name: string
  animateNoun: (seed: Seed) => Promise<string>
  previewImg: string
}

export type UploadedNoun = {
  image: Buffer
  glassesId: number
}

export type Seed = {
  head: number
  glasses: number
  body: number
  accessory: number
  background: number
}

export function instanceOfSeed(object: any): object is Seed {
  return 'member' in object
}

export function instanceOfUploadedNoun(object: any): object is UploadedNoun {
  return 'member' in object
}
