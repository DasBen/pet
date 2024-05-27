import {Post} from '../interfaces/post'

export const posts: Post[] = [
    {
        id: '1',
        profileId: 'user.id',
        mediaType: 'image',
        mediaUrl: 'https://loremflickr.com/1024/768/cat?random=1',
        text: 'Happy Birthday Fluffy! #birthday',
        hashtags: ['#birthday'],
        createdAt: '2020-01-01T12:00:00Z'
    },
    {
        id: '2',
        profileId: 'user.id',
        mediaType: 'image',
        mediaUrl: 'https://loremflickr.com/1024/768/cat?random=2',
        text: 'Look at this cute cat! #adorable',
        hashtags: ['#adorable'],
        createdAt: '2022-01-01T12:00:00Z'
    },
    {
        id: '3',
        profileId: 'user.id',
        mediaType: 'video',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        text: 'This cat is having so much fun!',
        hashtags: [],
        createdAt: '2023-09-02T12:00:00Z'
    },
    {
        id: '4',
        profileId: 'user.id',
        mediaType: 'text',
        mediaUrl: '',
        text: 'Please support our cats by donating! Check out #donate for more details.',
        hashtags: ['#donate'],
        createdAt: '2024-09-03T12:00:00Z'
    }
]
