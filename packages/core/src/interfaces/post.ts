export interface Post {
    id: string
    createdAt?: number
    updatedAt?: number
    deleteAt?: number
    mediaType: 'image' | 'video' | 'text'
    mediaUrl: string
    text: string
    hashtagIds: string[]
    animalIds?: string[]
    caretakerIds?: string[]
    organizationIds?: string[]
    userId: string
}
