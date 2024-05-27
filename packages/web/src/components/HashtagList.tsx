import React from 'react'
import {Card} from 'react-bootstrap'
import {Hashtag} from '../../../core/src/interfaces/hashtag'

interface HashtagListProps {
  className?: string
  title: string
  hashtags: Hashtag[]
}

const HashtagList: React.FC<HashtagListProps> = ({title, hashtags, className}) => {
  return (
    <Card className={className}>
      <Card.Body>
        <Card.Title>
          <h5>{title}</h5>
        </Card.Title>
        <ul className="list-unstyled">
          {hashtags.map((hashtag) => (
            <li key={hashtag.tag}>
              <a href={`/tags/${hashtag.tag.substring(1)}`}>#{hashtag.tag}</a>
              <span className="text-muted"> ({hashtag.count} posts)</span>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

export default HashtagList
