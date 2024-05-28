import {Entity} from 'electrodb'
import {Config} from 'sst/node/config'
import {DynamoDB} from '../services/dynamoDB'

export const AnimalEntity = new Entity(
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
            type: {
                type: 'string',
                required: true,
                default: 'pet'
            },
            animalType: {
                type: 'string',
                required: true
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
                    composite: ['createdAt']
                }
            },
            byAnimalType: {
                index: 'GSI2',
                pk: {
                    field: 'GSI2PK',
                    composite: ['animalType']
                },
                sk: {
                    field: 'GSI2SK',
                    composite: ['createdAt']
                }
            },
            byName: {
                index: 'GSI3',
                pk: {
                    field: 'GSI3PK',
                    composite: []
                },
                sk: {
                    field: 'GSI3SK',
                    composite: ['name']
                }
            }
        }
    },
    DynamoDB.Service
)
