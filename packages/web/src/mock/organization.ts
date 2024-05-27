import {Organization} from '../interfaces/organization'
import {caretaker} from './caretaker'

export const organization: Organization = {
    id: 'org1',
    type: 'organization',
    name: 'Animal Rescue Society',
    profileImageUrl: 'https://loremflickr.com/120/120/organization',
    bannerImageUrl: 'https://loremflickr.com/1920/400/organization-banner',
    description: 'A non-profit organization dedicated to rescuing and rehoming animals.',
    email: 'contact@animalrescuesociety.org',
    phone: '123-456-7890',
    web: 'https://animalrescuesociety.org',
    address: '123 Animal St, Pet City, PC 12345',
    followers: 1500,
    following: 200,
    posts: [],
    caretakers: [caretaker]
}
