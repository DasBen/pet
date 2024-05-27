import {UserProfile} from '../interfaces/user'
import {animal} from './animal'

export const user: UserProfile = {
    id: 'user1',
    type: 'user',
    name: 'Jane Smith',
    profileImageUrl: 'https://loremflickr.com/120/120/user',
    bannerImageUrl: 'https://loremflickr.com/1920/400/user-banner',
    description: 'Animal lover and pet owner.',
    followers: 100,
    following: 50,
    posts: [],
    ownedAnimals: [animal],
    address: '456 Pet Lane, Animal Town, AT 54321'
}
