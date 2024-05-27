import React from 'react'
import {Row, Col, Tab, Tabs, Card} from 'react-bootstrap'
import PostCard from '../components/PostCard'
import {Post} from '../interfaces/Post'
import {Profile} from '../interfaces/Profile'
import ProfileCard from '../components/ProfileCard'
import MediaCard from '../components/MediaCard'
import PedigreeNode from '../components/Pedigree'

const profileData: Profile = {
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
  birthday: '2019-01-01',
  location: 'New York, NY',
  mother: {
    id: '2',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=3',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=4',
    name: 'Whiskers',
    followers: 50,
    animalType: 'Cat'
  },
  father: {
    id: '3',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=5',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=6',
    name: 'Boots',
    followers: 60,
    animalType: 'Cat'
  },
  siblings: [
    {
      id: '4',
      profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=7',
      bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=8',
      name: 'Mittens',
      followers: 30,
      animalType: 'Cat'
    }
  ],
  children: [
    {
      id: '5',
      profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=9',
      bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=10',
      name: 'Socks',
      followers: 10,
      animalType: 'Cat'
    }
  ]
}

const posts: Post[] = [
  {
    id: '1',
    profileId: '1',
    mediaType: 'image',
    mediaUrl: 'https://loremflickr.com/1024/768/cat?random=1',
    text: 'Happy Birthday Fluffy! #birthday',
    hashtags: ['#birthday'],
    createdAt: '2020-01-01T12:00:00Z'
  },
  {
    id: '2',
    profileId: '1',
    mediaType: 'image',
    mediaUrl: 'https://loremflickr.com/1024/768/cat?random=2',
    text: 'Look at this cute cat! #adorable',
    hashtags: ['#adorable'],
    createdAt: '2022-01-01T12:00:00Z'
  },
  {
    id: '3',
    profileId: '1',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    text: 'This cat is having so much fun!',
    hashtags: [],
    createdAt: '2023-09-02T12:00:00Z'
  },
  {
    id: '4',
    profileId: '1',
    mediaType: 'text',
    mediaUrl: '',
    text: 'Please support our cats by donating! Check out #donate for more details.',
    hashtags: ['#donate'],
    createdAt: '2024-09-03T12:00:00Z'
  }
]

const ProfilePage: React.FC = () => {
  const handleLike = (postId: string) => {
    console.log(`Liked post ${postId}`)
  }

  const renderPosts = () =>
    posts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post, index) => (
        <PostCard key={post.id} index={index} post={post} onLike={handleLike} />
      ))

  const renderMediaGrid = () =>
    posts
      .filter((post) => post.mediaType === 'image' || post.mediaType === 'video')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post) => (
        <Col xs={6} md={4} lg={3} key={post.id} className="p-0">
          <MediaCard post={post} />
        </Col>
      ))

  return (
    <>
      <ProfileCard profile={profileData} />
      <Tabs defaultActiveKey="posts" id="profile-tabs" className="mt-3" fill>
        <Tab eventKey="posts" title="Posts">
          {renderPosts()}
        </Tab>
        <Tab eventKey="media" title="Media">
          <Row>
            <Col>
              <Card className="mb-0 rounded-top-0">
                <Card.Body>
                  <Row className="no-gutters">{renderMediaGrid()}</Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        {(profileData.children ||
          profileData.siblings ||
          profileData.mother ||
          profileData.father) && (
          <Tab eventKey="pedigree" title="Pedigree">
            <PedigreeNode profile={profileData} />
          </Tab>
        )}
      </Tabs>
    </>
  )
}

export default ProfilePage
