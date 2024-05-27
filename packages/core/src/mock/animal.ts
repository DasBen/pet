import {Animal} from '../interfaces/animal'
import {posts} from './posts'

export const mother: Animal = {
    id: '2',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=3',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=4',
    name: 'Whiskers',
    followers: 50,
    animalType: 'Cat',
    type: 'animal',
    posts: posts
}

export const father: Animal = {
    id: '3',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=5',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=6',
    name: 'Boots',
    followers: 60,
    animalType: 'Cat',
    type: 'animal',
    posts: posts
}

export const sibling: Animal = {
    id: '4',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=7',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=8',
    name: 'Mittens',
    followers: 30,
    animalType: 'Cat',
    type: 'animal',
    posts: posts
}

export const child: Animal = {
    id: '5',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=9',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=10',
    name: 'Socks',
    followers: 10,
    animalType: 'Cat',
    type: 'animal',
    posts: posts
}

export const animal: Animal = {
    id: '1',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=1',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=2',
    name: 'Fluffy',
    description: 'Caring and loving cat looking for a new home. #adoptme',
    followers: 120,
    monthlyFundingGoal: 1000,
    monthlyFundingCurrent: 600,
    lifetimeFundingGoal: 10000,
    lifetimeFundingCurrent: 600,
    animalType: 'Cat',
    type: 'animal',
    birthday: '2019-01-01',
    location: 'New York, NY',
    posts: posts,
    mother: mother,
    father: father,
    siblings: [sibling],
    children: [child]
}