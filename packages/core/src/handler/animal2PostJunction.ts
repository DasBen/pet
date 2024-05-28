import {DynamoDBStreamEvent} from 'aws-lambda'
import {unmarshall} from '@aws-sdk/util-dynamodb'
import {AttributeValue} from '@aws-sdk/client-dynamodb'
import {Animal2PostEntity} from '../entities/animal2Post'
import {Animal} from '../interfaces/animal'
import {Post} from '../interfaces/post'

export async function animal(event: DynamoDBStreamEvent): Promise<void> {
    for (const record of event.Records) {
        // Get new and old images
        let oldAnimal
        if (record.dynamodb && record.dynamodb.OldImage) {
            oldAnimal = unmarshall(
                record.dynamodb.OldImage as {[key: string]: AttributeValue}
            ) as Animal
        }

        let newAnimal
        if (record.dynamodb && record.dynamodb.NewImage) {
            newAnimal = unmarshall(
                record.dynamodb.NewImage as {[key: string]: AttributeValue}
            ) as Animal
        }
    }
}

export async function post(event: DynamoDBStreamEvent): Promise<void> {
    for (const record of event.Records) {
        // Get new and old images
        let oldPost
        if (record.dynamodb && record.dynamodb.OldImage) {
            oldPost = unmarshall(
                record.dynamodb.OldImage as {[key: string]: AttributeValue}
            ) as Post
        }

        let newPost
        if (record.dynamodb && record.dynamodb.NewImage) {
            newPost = unmarshall(
                record.dynamodb.NewImage as {[key: string]: AttributeValue}
            ) as Post
        }

        // Create/Update Junction Records
        switch (record.eventName) {
            case 'INSERT':
                upsertPost(newPost!)
                return
            case 'REMOVE':
                deletePost(oldPost!)
                return
            default:
                break
        }
    }
}

const upsertPost = async (newPost: Post) => {
    if (!newPost.mentions) {
        return
    }

    // Get Ids
    const animalIds = newPost.mentions
        .filter((mention) => mention.type === 'animal')
        .map((mention) => mention.id)
    const postId = newPost.id

    // Create/Update
    for (const animalId of animalIds) {
        await Animal2PostEntity.upsert({
            animalId,
            postId
        }).go()
    }
}

const deletePost = async (oldPost: Post) => {
    if (!oldPost.mentions) {
        return
    }

    // Get Ids
    const animalIds = oldPost.mentions
        .filter((mention) => mention.type === 'animal')
        .map((mention) => mention.id)
    const postId = oldPost.id!

    // Delete
    for (const animalId of animalIds) {
        await Animal2PostEntity.delete({
            animalId,
            postId
        }).go()
    }
}
