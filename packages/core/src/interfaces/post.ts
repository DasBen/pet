import {BaseSchema} from './baseSchema'
import {Mention} from './mention'

export interface Post extends BaseSchema {
    mediaType: 'image' | 'video' | 'text'
    mediaUrl?: string
    text?: string
    mentions?: Mention[]
    userId: string
    pinned: boolean
}

export type PostPatch = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

export function removeReadOnlyFields(post: Post): PostPatch {
    const {id, createdAt, updatedAt, ...rest} = post
    return rest
}
