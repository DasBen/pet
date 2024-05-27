export interface Post {
  id: string
  profileId: string
  mediaType: 'image' | 'video' | 'text'
  mediaUrl: string
  text: string
  hashtags: string[]
  createdAt: string // ISO 8601 format date string
}
