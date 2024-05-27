import {Col, Tabs, Tab, Row, Card} from 'react-bootstrap'
import ProfileCard from '../components/profileCard'
import MediaCard from '../components/mediaCard'
import PostCard from '../components/postCard'
import {posts} from '../mock/posts'
import {animal} from '../mock/animal'
import Pedigree from '../components/pedigree'

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
      <ProfileCard profile={animal} />
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
        {(animal.children || animal.siblings || animal.mother || animal.father) && (
          <Tab eventKey="pedigree" title="Pedigree">
            <Pedigree animal={animal} />
          </Tab>
        )}
      </Tabs>
    </>
  )
}

export default ProfilePage
