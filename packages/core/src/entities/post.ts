import {Entity} from 'electrodb'
import {Config} from 'sst/node/config'
import {DynamoDB} from '../services/dynamoDB'

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
