import {Api} from 'sst/node/api'
import {AnimalInterface} from '../entities/animal'
import AnimalApiClient from './animalApiClient'
import {afterEach, beforeEach, expect, it} from 'vitest'
import {describe} from 'node:test'

const apiClient = new AnimalApiClient(Api.api.url)
let animal: AnimalInterface

describe('AnimalApi', () => {
    beforeEach(async () => {
        // Defaults
        animal = {
            type: 'pet',
            animalType: 'test',
            name: 'AnimalApi',
            profileImageUrl: 'https://loremflickr.com/128/128/cat',
            bannerImageUrl: 'https://loremflickr.com/1920/400/cat',
            description: 'AnimalApi'
        }

        animal = await apiClient.post(animal)
    })

    afterEach(async () => {
        // Delete pet
        if (animal.id) {
            await apiClient.delete(animal.id)
        }
    })

    it('create a pet', async () => {
        // Get the newly created pet
        const getResponse = await apiClient.get(animal.id!)
        expect(getResponse).not.toBeUndefined()
        expect(getResponse!.id).toEqual(animal.id)
        expect(getResponse!.name).toEqual(animal.name)
        expect(getResponse!.profileImageUrl).toEqual(animal.profileImageUrl)
        expect(getResponse!.bannerImageUrl).toEqual(animal.bannerImageUrl)
        expect(getResponse!.description).toEqual(animal.description)

        // Get all pets by type
        const listResponse = await apiClient.list({type: animal.type})
        expect(listResponse.data.find((a) => a.id === animal.id)).not.toBeUndefined()

        // Get all pets by animalType
        const listByAnimalTypeResponse = await apiClient.list({animalType: animal.animalType})
        expect(listByAnimalTypeResponse.data.find((a) => a.id === animal.id)).not.toBeUndefined()
    })

    it('patch a pet', async () => {
        // Update the pet
        const newDescription = 'A very good girl'
        const updatedAnimal = await apiClient.put({
            ...animal,
            description: newDescription
        })

        console.log(updatedAnimal)

        expect(updatedAnimal).not.toBeUndefined()
        expect(updatedAnimal.id).toEqual(animal.id)
        expect(updatedAnimal.description).toEqual(newDescription)
        expect(updatedAnimal.updatedAt).toBeGreaterThan(updatedAnimal.createdAt!)
    })

    it('delete a pet', async () => {
        // Delete the pet
        await apiClient.delete(animal.id!)

        // Get the deleted pet
        try {
            await apiClient.get(animal.id!)
        } catch (e) {
            expect(e).not.toBeUndefined()
        }
    })
})
