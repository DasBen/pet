import {afterEach, beforeEach, expect, it} from 'vitest'
import {AnimalRepository} from './animalRepository'
import {describe} from 'node:test'
import { Animal } from '../interfaces/animal'

const animalRepository = new AnimalRepository()
let animal: Animal

describe('AnimalRepository', () => {
    beforeEach(async () => {
        // Default
        animal = {
            type: 'pet',
            animalType: 'test',
            name: 'Fido',
            profileImageUrl: 'https://loremflickr.com/128/128/dog',
            bannerImageUrl: 'https://loremflickr.com/1920/400/dog',
            description: 'AnimalRepository'
        }

        animal = await animalRepository.create(animal)
    })

    afterEach(async () => {
        // Delete animal
        if (animal.id) {
            await animalRepository.delete(animal.id)
        }
    })

    it('create', async () => {
        // Get the newly created
        const getResponse = await animalRepository.get(animal.id!)
        expect(getResponse).not.toBeUndefined()
        expect(getResponse!.id).toEqual(animal.id)
        expect(getResponse!.name).toEqual(animal.name)
        expect(getResponse!.profileImageUrl).toEqual(animal.profileImageUrl)
        expect(getResponse!.bannerImageUrl).toEqual(animal.bannerImageUrl)
        expect(getResponse!.description).toEqual(animal.description)

        // Get all by type
        const listResponse = await animalRepository.listByType(animal.type)
        expect(listResponse.data.find((a) => a.id === animal.id)).not.toBeUndefined()

        // Get all by animalType
        const listByAnimalTypeResponse = await animalRepository.listByAnimalType(animal.animalType)
        expect(listByAnimalTypeResponse.data.find((a) => a.id === animal.id)).not.toBeUndefined()
    })

    it('patch a pet', async () => {
        const newDescription = 'A very good boy'

        // Update
        const updatedAnimal = await animalRepository.patch(animal.id!, {
            ...animal,
            description: newDescription
        })

        expect(updatedAnimal).not.toBeUndefined()
        expect(updatedAnimal.id).toEqual(animal.id)
        expect(updatedAnimal.description).toEqual(newDescription)
        expect(updatedAnimal.updatedAt).toBeGreaterThan(updatedAnimal.createdAt!)
    })

    it('delete a pet', async () => {
        // Delete
        await animalRepository.delete(animal.id!)

        // Get the deleted item
        const getResponse = await animalRepository.get(animal.id!)
        expect(getResponse).toBeNull()
    })
})
