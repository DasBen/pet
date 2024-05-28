import {Entity} from 'electrodb'
import {Config} from 'sst/node/config'
import {DynamoDB} from '../services/dynamoDB'

export interface Mention {
    type: string
    name: string
    id: string
}

export interface PostInterface {
    id?: string
    createdAt?: number
    updatedAt?: number
    deleteAt?: number
    mediaType: 'image' | 'video' | 'text'
    mediaUrl?: string
    text?: string
    userId: string
    pinned: boolean
    mentions?: Mention[]
}

type ReadOnlyFields = 'id' | 'createdAt' | 'updatedAt'

export type PostWithoutReadOnlyFields = Omit<PostInterface, ReadOnlyFields>

export function removeReadOnlyFields(post: PostInterface): PostWithoutReadOnlyFields {
    const {id, createdAt, updatedAt, ...rest} = post
    return rest
}

export const PostEntity = new Entity(
    {
        model: {
            entity: 'post',
            version: '1',
            service: Config.APP
        },
        attributes: {
            id: {
                type: 'string',
                required: true,
                default: () => crypto.randomUUID()
            },
            createdAt: {
                type: 'number',
                readOnly: true,
                required: true,
                default: () => Date.now()
            },
            updatedAt: {
                type: 'number',
                watch: '*',
                set: () => Date.now()
            },
            deleteAt: {
                type: 'number'
            },
            mediaType: {
                type: 'string',
                required: true
            },
            mediaUrl: {
                type: 'string'
            },
            text: {
                type: 'string'
            },
            mentions: {
                type: 'list',
                items: {
                    type: 'map',
                    properties: {
                        type: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        id: {
                            type: 'string'
                        }
                    }
                },
                default: () => []
            },
            userId: {
                type: 'string',
                required: true
            },
            pinned: {
                type: 'boolean',
                required: true,
                default: () => false
            }
        },
        indexes: {
            primary: {
                pk: {
                    field: 'PK',
                    composite: ['id']
                },
                sk: {
                    field: 'SK',
                    composite: []
                }
            },
            byUserId: {
                index: 'GSI1',
                pk: {
                    field: 'GSI1PK',
                    composite: ['userId']
                },
                sk: {
                    field: 'GSI1SK',
                    composite: ['createdAt']
                }
            }
        }
    },
    DynamoDB.Service
)
