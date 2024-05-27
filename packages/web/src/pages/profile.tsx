import {Col, Tabs, Tab, Row, Card} from 'react-bootstrap'
import ProfileCard from '../components/profileCard'
import MediaCard from '../components/mediaCard'
import PostCard from '../components/postCard'
import Pedigree from '../components/pedigree'
import {user} from '../mock/user'
import {useEffect, useState} from 'react'
import {BaseProfile} from '../interfaces/baseProfile'
import {organization} from '../mock/organization'
import {caretaker} from '../mock/caretaker'
import {animal} from '../mock/animal'
import {useParams} from 'react-router-dom'
import {Animal} from '../interfaces/animal'
import {get} from 'lodash'

const Profile: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [profile, setProfile] = useState<BaseProfile>(user)

  // @todo fetch profile by id
  useEffect(() => {
    switch (id) {
      case '1':
        setProfile(user)
        break
      case '2':
        setProfile(caretaker)
        break
      case '3':
        setProfile(organization)
        break
      case '4':
        setProfile(animal)
        break
      default:
        setProfile(user)
        break
    }
  }, [id])

  const handleLike = (postId: string) => {
    console.log(`Liked post ${postId}`)
  }

  const renderPosts = () =>
    profile.posts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post, index) => (
        <PostCard key={post.id} index={index} post={post} onLike={handleLike} />
      ))

  const renderMediaGrid = () =>
    profile.posts
      .filter((post) => post.mediaType === 'image' || post.mediaType === 'video')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post) => (
        <Col xs={6} md={4} lg={3} key={post.id} className="p-0">
          <MediaCard post={post} />
        </Col>
      ))

  const getPedigree = (profile: Animal) => {
    return (
      <Tab eventKey="pedigree" title="Pedigree">
        <Pedigree animal={profile} />
      </Tab>
    )
  }

  return (
    <>
      <ProfileCard profile={profile} />
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
        {getPedigree(profile as Animal)}
      </Tabs>
    </>
  )
}

export default Profile
