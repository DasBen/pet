import {Entity} from 'electrodb'
import {Config} from 'sst/node/config'
import {DynamoDB} from '../services/dynamoDB'
import {BaseProfile} from '../interfaces/baseProfile'

export interface AnimalInterface extends BaseProfile {
    animalType: string
    monthlyFundingGoal?: number
    lifetimeFundingGoal?: number
    location?: string
    motherId?: string
    fatherId?: string
    siblings?: string[]
    children?: string[]
    ownerId?: string
    caretakerId?: string
    organizationId?: string
}

export const Animal = new Entity(
    {
        model: {
            entity: 'animal',
            version: '1',
            service: Config.APP
        },
        attributes: {
            id: {
                type: 'string',
                required: true,
                default: () => crypto.randomUUID()
            },
            type: {
                type: 'string',
                required: true,
                default: 'animal'
            },
            animalType: {
                type: 'string',
                required: true,
                set: (value: string | undefined) => {
                    if (!value) return ''
                    return value.charAt(0).toUpperCase() + value.slice(1)
                }
            },
            name: {
                type: 'string',
                required: true
            },
            profileImageUrl: {
                type: 'string',
                required: true
            },
            bannerImageUrl: {
                type: 'string',
                required: true
            },
            description: {
                type: 'string'
            },
            followers: {
                type: 'number',
                default: 0
            },
            following: {
                type: 'number',
                default: 0
            },
            birthday: {
                type: 'string'
            },
            monthlyFundingGoal: {
                type: 'number'
            },
            lifetimeFundingGoal: {
                type: 'number'
            },
            location: {
                type: 'string'
            },
            motherId: {
                type: 'string'
            },
            fatherId: {
                type: 'string'
            },
            siblings: {
                type: 'list',
                items: {
                    type: 'string'
                }
            },
            children: {
                type: 'list',
                items: {
                    type: 'string'
                }
            },
            ownerId: {
                type: 'string'
            },
            caretakerId: {
                type: 'string'
            },
            organizationId: {
                type: 'string'
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
                required: true,
                default: () => Date.now(),
                set: () => Date.now()
            },
            deleteAt: {
                type: 'number'
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
            byType: {
                index: 'GSI1',
                pk: {
                    field: 'GSI1PK',
                    composite: ['type']
                },
                sk: {
                    field: 'GSI1SK',
                    composite: []
                }
            }
        }
    },
    DynamoDB.Service
)
