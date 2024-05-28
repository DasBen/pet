import {describe, expect, it, beforeEach, afterEach} from 'vitest'
import {PostRepository} from './postRepository'
import {AnimalRepository} from './animalRepository'
import {Animal2PostEntity} from '../entities/animal2Post'
import { Animal } from '../interfaces/animal'
import { Post } from '../interfaces/post'
import { Mention } from '../interfaces/mention'

const animalRepository = new AnimalRepository()
const postRepository = new PostRepository()
let animal: Animal
let post: Post
let mentions: Mention[]

describe('PostRepository', () => {
    beforeEach(async () => {
        // Defaults
        animal = {
            type: 'pet',
            animalType: 'test',
            name: 'PostRepository',
            profileImageUrl: 'https://loremflickr.com/128/128/snake',
            bannerImageUrl: 'https://loremflickr.com/1920/400/snake',
            description: 'PostRepository'
        }
        mentions = []
        post = {
            mediaType: 'text',
            userId: crypto.randomUUID(),
            pinned: false,
            text: 'You are so cute @PostRepository!'
        }

        // Create animal
        animal = await animalRepository.create(animal)

        // Add mention with id and create post
        mentions.push({
            type: 'animal',
            name: animal.name,
            id: animal.id!
        })
        post.mentions = mentions
        post = await postRepository.create(post)
    })

    afterEach(async () => {
        // Delete animal
        if (animal.id) {
            await animalRepository.delete(animal.id)
        }
        // Delete post
        if (post.id) {
            await postRepository.delete(post.id)
        }
    })

    it('create a text post', async () => {
        // Get the newly created
        const getResponse = await postRepository.get(post.id!)
        expect(getResponse).not.toBeUndefined()
        expect(getResponse!.id).toEqual(post.id)
        expect(getResponse!.text).toEqual(post.text)
        expect(getResponse!.mentions).toEqual(post.mentions)
        expect(getResponse!.userId).toEqual(post.userId)
        expect(getResponse!.pinned).toEqual(post.pinned)

        // Wait for the DynamoDB Stream to trigger
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Read latest Junction
        const junction = await Animal2PostEntity.query
            .byPostId({postId: post.id!})
            .go({order: 'desc', limit: 1})
        expect(junction).not.toBeUndefined()
        expect(junction.data[0].animalId).toEqual(animal.id)
        expect(junction.data[0].postId).toEqual(post.id)
    })

    it.todo('create a image post')
    it.todo('create a video post')

    it('patch a post', async () => {
        const newText = '@PostRepository Test!'

        if (!post.id) {
            throw new Error('Post ID is undefined')
        }

        // Update
        const updatedPost = await postRepository.patch(post.id, {
            ...post,
            text: newText
        })

        expect(updatedPost).not.toBeUndefined()
        expect(updatedPost.id).toEqual(post.id)
        expect(updatedPost.text).toEqual(newText)
        expect(updatedPost.updatedAt).toBeGreaterThan(updatedPost.createdAt!)
    })

    it.todo('patch a post with a new mention')
    it.todo('patch a post with a removed mention')

    it('delete a post', async () => {
        // Delete
        await postRepository.delete(post.id!)

        // Get the deleted item
        const getResponse = await postRepository.get(post.id!)
        expect(getResponse).toBeNull()

        // Wait for the DynamoDB Stream to trigger
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Read latest Junction
        const junction = await Animal2PostEntity.query
            .byPostId({postId: post.id!})
            .go({order: 'desc', limit: 1})

        expect(junction).not.toBeUndefined()
        expect(junction.data.length).toEqual(0)
    })
})
