import {Col, Tabs, Tab, Row, Card} from 'react-bootstrap'
import AnimalProfileCard from '../components/animalProfileCard'
import Pedigree from '../components/pedigree'
import {user} from '../../../core/src/mock/user'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {AnimalInterface} from '../../../core/src/entities/animalEntity'
import ApiClient from '../services/AnimalApi'

const apiClient = new ApiClient(import.meta.env.VITE_APP_API_URL)

const AnimalProfile: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [profile, setProfile] = useState<AnimalInterface | undefined>(undefined)

  useEffect(() => {
    async function fetchAnimal() {
      if (id === undefined) {
        return
      }
      const response = await apiClient.getAnimal(id)

      if (response) {
        setProfile(response)
      }
    }

    fetchAnimal()
  }, [id])

  const handleLike = (postId: string) => {
    console.log(`Liked post ${postId}`)
  }

  // const renderPosts = () =>
  //   profile.posts
  //     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  //     .map((post, index) => (
  //       <PostCard key={post.id} index={index} post={post} onLike={handleLike} />
  //     ))

  // const renderMediaGrid = () =>
  //   profile.posts
  //     .filter((post) => post.mediaType === 'image' || post.mediaType === 'video')
  //     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  //     .map((post) => (
  //       <Col xs={6} md={4} lg={3} key={post.id} className="p-0">
  //         <MediaCard post={post} />
  //       </Col>
  //     ))

  const getPedigree = (profile: AnimalInterface) => {
    return (
      <Tab eventKey="pedigree" title="Pedigree">
        <Pedigree animal={profile} />
      </Tab>
    )
  }

  return (
    <>
      <AnimalProfileCard profile={profile} />
      <Tabs defaultActiveKey="posts" id="profile-tabs" className="mt-3" fill>
        <Tab eventKey="posts" title="Posts">
          {/* {renderPosts()} */}
        </Tab>
        <Tab eventKey="media" title="Media">
          <Row>
            <Col>
              <Card className="mb-0 rounded-top-0">
                <Card.Body>{/* <Row className="no-gutters">{renderMediaGrid()}</Row> */}</Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="pedigree" title="Pedigree">
          <Pedigree animal={profile} />
        </Tab>
      </Tabs>
    </>
  )
}

export default AnimalProfile
