import {UserProfile} from '../interfaces/user'
import {animal} from './animal'
import {organization} from './organization'
import {posts} from './posts'

export const caretaker: UserProfile = {
    id: 'user1',
    type: 'caretaker',
    name: 'Jon Smith',
    profileImageUrl: 'https://loremflickr.com/120/120/user',
    bannerImageUrl: 'https://loremflickr.com/1920/400/user-banner',
    description: 'Animal lover and pet owner.',
    followers: 51,
    following: 50,
    posts: posts,
    ownedAnimals: [animal],
    careTakerProfile: {
        animalsCaredFor: [animal],
        yearsOfExperience: 3,
        qualifications: ['Certified Veterinary Technician'],
        workSchedule: 'Tue-Sat, 8am-4pm',
        location: 'Animal Town',
        organization: organization
    },
    address: '456 Pet Lane, Animal Town, AT 54321'
}
