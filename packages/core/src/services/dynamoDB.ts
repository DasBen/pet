import DynamoDB from 'aws-sdk/clients/dynamodb'
import {Table} from 'sst/node/table'
export * as DynamoDB from './dynamoDB'

export const Client = new DynamoDB.DocumentClient()
export const Service = {
    client: Client,
    table: Table.data.tableName
}
