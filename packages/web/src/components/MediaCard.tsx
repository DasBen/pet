import React from 'react'
import {Card} from 'react-bootstrap'
import {Post} from '../interfaces/Post'

interface MediaCardProps {
  post: Post
}

const MediaCard: React.FC<MediaCardProps> = ({post}) => {
  return (
    <Card className="h-100 border-1 rounded-0">
      {post.mediaType === 'image' && (
        <Card.Img
          src={post.mediaUrl}
          alt={post.text}
          className="h-100 w-100"
          style={{objectFit: 'cover'}}
        />
      )}
      {post.mediaType === 'video' && (
        <Card.Body className="d-flex justify-content-center align-items-center p-0">
          <video controls className="w-100 h-100">
            <source src={post.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card.Body>
      )}
    </Card>
  )
}

export default MediaCard
