import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import {DynamoDBDocumentClient} from '@aws-sdk/lib-dynamodb'

import {Table} from 'sst/node/table'
export * as DynamoDB from './dynamoDB'

export const Client = new DynamoDBClient()
export const Service = {
    client: Client,
    table: Table.data.tableName
}
