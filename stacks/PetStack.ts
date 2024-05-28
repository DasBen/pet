import {StackContext, Table, EventBus, Bucket, StaticSite, Api, Function} from 'sst/constructs'
import * as cdk from 'aws-cdk-lib'
import {StartingPosition} from 'aws-cdk-lib/aws-lambda'
import {RetentionDays} from 'aws-cdk-lib/aws-logs'

export function PetStack({app, stack}: StackContext) {
    // Stage Variables
    let removalPolicy = cdk.RemovalPolicy.RETAIN
    let lifecycleExpiration = cdk.Duration.days(7)
    let maxBatchingWindow = cdk.Duration.seconds(60)
    let batchSize = 100
    let retryAttempts = 3
    let logRetention: Lowercase<keyof typeof RetentionDays> = 'one_month'
    if (app.stage !== 'prod') {
        removalPolicy = cdk.RemovalPolicy.DESTROY
        app.setDefaultRemovalPolicy(removalPolicy)
        lifecycleExpiration = cdk.Duration.days(1)
        maxBatchingWindow = cdk.Duration.seconds(0)
        batchSize = 1
        retryAttempts = 0
        logRetention = 'one_day'
    }

    // S3
    const storage = new Bucket(stack, 'storage', {
        cdk: {
            bucket: {
                autoDeleteObjects: removalPolicy === cdk.RemovalPolicy.DESTROY,
                removalPolicy,
                lifecycleRules: [
                    {
                        expiration: lifecycleExpiration
                    }
                ]
            }
        }
    })

    // Tables
    const dataTable = new Table(stack, 'data', {
        fields: {
            PK: 'string',
            SK: 'string',
            GSI1PK: 'string',
            GSI1SK: 'string',
            GSI2PK: 'string',
            GSI2SK: 'string',
            GSI3PK: 'string',
            GSI3SK: 'string'
        },
        primaryIndex: {partitionKey: 'PK', sortKey: 'SK'},
        globalIndexes: {
            GSI1: {
                partitionKey: 'GSI1PK',
                sortKey: 'GSI1SK'
            },
            GSI2: {
                partitionKey: 'GSI2PK',
                sortKey: 'GSI2SK'
            },
            GSI3: {
                partitionKey: 'GSI3PK',
                sortKey: 'GSI3SK'
            }
        },
        timeToLiveAttribute: 'deleteAt',
        cdk: {
            table: {
                removalPolicy: removalPolicy
            }
        },
        stream: 'new_and_old_images'
    })

    // DynamoDBStream Consumers
    dataTable.addConsumers(stack, {
        animal2PostJunctionAnimalConsumer: {
            cdk: {
                eventSource: {
                    startingPosition: StartingPosition.LATEST,
                    batchSize,
                    maxBatchingWindow,
                    retryAttempts
                }
            },
            function: {
                handler: `packages/core/src/handler/animal2PostJunction.animal`,
                bind: [dataTable],
                logRetention
            },
            filters: [
                {
                    dynamodb: {
                        NewImage: {
                            __edb_e__: {
                                S: ['animal']
                            }
                        },
                        OldImage: {
                            __edb_e__: {
                                S: ['animal']
                            }
                        }
                    }
                }
            ]
        },
        animal2PostJunctionPostConsumer: {
            cdk: {
                eventSource: {
                    startingPosition: StartingPosition.LATEST,
                    batchSize,
                    maxBatchingWindow,
                    retryAttempts
                }
            },
            function: {
                handler: `packages/core/src/handler/animal2PostJunction.post`,
                bind: [dataTable],
                logRetention
            },
            filters: [
                {
                    dynamodb: {
                        NewImage: {
                            __edb_e__: {
                                S: ['post']
                            }
                        }
                    }
                },
                {
                    dynamodb: {
                        OldImage: {
                            __edb_e__: {
                                S: ['post']
                            }
                        }
                    }
                }
            ]
        }
    })

    // API
    const api = new Api(stack, 'api', {
        cors: {
            allowMethods: ['ANY'],
            allowOrigins: [
                'http://localhost:5173',
                'https://qjsux9xgog.execute-api.eu-central-1.amazonaws.com'
            ]
        },
        defaults: {
            function: {
                bind: [dataTable, storage],
                timeout: '30 seconds'
            }
        },
        routes: {
            // Animal Routes
            'GET /animal': `packages/api/src/animalApi.list`,
            'GET /animal/{id}': `packages/api/src/animalApi.get`,
            'PUT /animal/{id}': `packages/api/src/animalApi.put`,
            'POST /animal': `packages/api/src/animalApi.post`,
            'DELETE /animal/{id}': `packages/api/src/animalApi.del`
        }
    })
    api.attachPermissions([
        new cdk.aws_iam.PolicyStatement({
            actions: ['bedrock:InvokeModel'],
            resources: ['*'],
            effect: cdk.aws_iam.Effect.ALLOW
        })
    ])

    // Frontend
    const web = new StaticSite(stack, 'web', {
        path: 'packages/web',
        buildOutput: 'dist',
        buildCommand: 'npm run build',
        environment: {
            VITE_APP_API_URL: api.url
            // VITE_API_URL_WITH_AUTH: `${api.url}/auth/google/authorize`
        }
    })

    // Auth
    // const auth = new Auth(stack, 'auth', {
    //     authenticator: {
    //         handler: `packages/api/src/api/authApi.handler`,
    //         bind: [bus, storage, web],
    //         timeout: '30 seconds'
    //     }
    // })

    // auth.attach(stack, {
    //     api,
    //     prefix: '/auth'
    // })

    // Outputs
    stack.addOutputs({
        web: web.url,
        api: api.url
    })
}
