import {
    StackContext,
    Table,
    EventBus,
    Bucket,
    StaticSite,
    Api,
    Auth,
    Config as ConfigConstruct,
    use,
    Config
} from 'sst/constructs'
import * as cdk from 'aws-cdk-lib'

export function PetStack({app, stack}: StackContext) {
    // Stage Variables
    let removalPolicy = cdk.RemovalPolicy.RETAIN
    let lifecycleExpiration = cdk.Duration.days(7)
    if (app.stage !== 'prod') {
        app.setDefaultRemovalPolicy('destroy')
        removalPolicy = cdk.RemovalPolicy.DESTROY
        lifecycleExpiration = cdk.Duration.days(1)
    }

    // Event Bus
    const bus = new EventBus(stack, 'bus', {
        defaults: {
            retries: 10
        }
    })

    // S3
    const storage = new Bucket(stack, 'storage', {
        cdk: {
            bucket: {
                autoDeleteObjects: removalPolicy === cdk.RemovalPolicy.DESTROY,
                removalPolicy: removalPolicy,
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
        cdk: {
            table: {
                removalPolicy: removalPolicy
            }
        }
    })

    // API
    const api = new Api(stack, 'api', {
        cors: {
            allowMethods: ['ANY'],
            allowOrigins: ['http://localhost:5173']
        },
        defaults: {
            function: {
                bind: [dataTable, storage, bus],
                timeout: '30 seconds'
            }
        },
        // @todo rate limit for all routes?
        routes: {
            // User Routes
            // 'GET /user': `packages/api/src/api/userApi.get`,
            // 'PUT /user': `packages/api/src/api/userApi.put`,
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
