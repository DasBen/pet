// src/components/PostCard.tsx
import React from 'react'
import {Card, Row, Col, Image, ButtonGroup} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faComment, faDollarSign, faShare} from '@fortawesome/free-solid-svg-icons'
import {formatDistanceToNow, format} from 'date-fns'
import HoverButton from './hoverButton'
import {Post} from '../../../core/src/interfaces/post'

interface PostCardProps {
  index: number
  post: Post
  onLike: (postId: string) => void
}

const PostCard: React.FC<PostCardProps> = ({index, post, onLike}) => {
  const postDate = new Date(post.createdAt)
  const fullTimestamp = format(postDate, 'PPpp')
  const timeAgo = formatDistanceToNow(postDate, {addSuffix: true})

  const replaceWithLinks = (text: string) => {
    return text.split(' ').map((word, index) =>
      word.startsWith('#') ? (
        <span key={`${word}-${index}`}>
          <a href={`/tags/${word.substring(1)}`} className="text-decoration-none">
            {word}
          </a>{' '}
        </span>
      ) : word.startsWith('@') ? (
        <span key={`${word}-${index}`}>
          <a href={`/profile/${word.substring(1)}`} className="text-decoration-none">
            {word}
          </a>{' '}
        </span>
      ) : (
        <span key={`${word}-${index}`}>{word} </span>
      )
    )
  }

  return (
    <Card key={index} className={`mb-0 ${index === 0 ? 'rounded-top-0' : ''}`}>
      <Card.Body>
        <Row>
          <Col xs="1">
            <Image src="https://loremflickr.com/48/48/cat?lock=1" roundedCircle />
          </Col>
          <Col>
            <Row className="align-items-center mb-3">
              <h5 className="mb-0">
                Fluffy{' '}
                <small className="text-muted">
                  {' • '}
                  <a className="text-decoration-none text-reset" href={`/post/${post.id}`}>
                    <span title={fullTimestamp}>{timeAgo}</span>
                  </a>
                </small>
              </h5>
            </Row>
            {post.mediaUrl && post.mediaType === 'image' && (
              <Image src={post.mediaUrl} fluid thumbnail />
            )}
            {post.mediaUrl && post.mediaType === 'video' && (
              <video controls width="100%">
                <source src={post.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <Card.Text className="mt-3">{replaceWithLinks(post.text)}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="p-0">
        <div className="d-grid gap-2">
          <ButtonGroup size="sm">
            <HoverButton
              variant="outline-secondary"
              hoverVariant="outline-danger"
              className="w-100 border-0"
              onClick={() => onLike(post.id)}
            >
              <FontAwesomeIcon icon={faHeart} /> Like
            </HoverButton>
            <HoverButton
              variant="outline-secondary"
              hoverVariant="outline-primary"
              className="w-100 border-0"
              href={`/post/${post.id}/comments`}
            >
              <FontAwesomeIcon icon={faComment} /> Comment
            </HoverButton>
            <HoverButton
              variant="outline-secondary"
              hoverVariant="outline-success"
              className="w-100 border-0"
              href={`/post/${post.id}/fund`}
            >
              <FontAwesomeIcon icon={faDollarSign} /> Fund
            </HoverButton>
            <HoverButton
              variant="outline-secondary"
              hoverVariant="outline-info"
              className="w-100 border-0"
              href={`/post/${post.id}/share`}
            >
              <FontAwesomeIcon icon={faShare} /> Share
            </HoverButton>
          </ButtonGroup>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default PostCard
