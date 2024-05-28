import {Entity} from 'electrodb'
import {Config} from 'sst/node/config'
import {DynamoDB} from '../services/dynamoDB'

export const Animal2PostEntity = new Entity(
    {
        model: {
            entity: 'animal2post',
            version: '1',
            service: Config.APP
        },
        attributes: {
            animalId: {
                type: 'string',
                required: true
            },
            postId: {
                type: 'string',
                required: true
            }
        },
        indexes: {
            byAnimalId: {
                pk: {
                    field: 'PK',
                    composite: ['animalId']
                },
                sk: {
                    field: 'SK',
                    composite: ['postId']
                }
            },
            byPostId: {
                index: 'GSI1',
                pk: {
                    field: 'GSI1PK',
                    composite: ['postId']
                },
                sk: {
                    field: 'GSI1SK',
                    composite: ['animalId']
                }
            }
        }
    },
    DynamoDB.Service
)
