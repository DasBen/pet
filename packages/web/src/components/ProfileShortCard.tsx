import React from 'react'
import {Card, Row, Col, Image} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCakeCandles, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import {ProfileCardProps} from './profileCard'

const ProfileCard: React.FC<ProfileCardProps> = ({profile}) => {
  return (
    <Card>
      <Card.Body>
        <Row className="my-2">
          <Col xs={4}>
            <Image src={profile.profileImageUrl} alt="Profile" roundedCircle fluid />
          </Col>
          <Col>
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <ul className="list-inline">
              {profile.birthday && (
                <li className="text-muted list-inline-item">
                  <FontAwesomeIcon icon={faCakeCandles} /> {profile.birthday} (Age: 2 years)
                </li>
              )}
              {/* @todo use locationId if present */}
              {profile.location && (
                <li className="text-muted list-inline-item">
                  <FontAwesomeIcon icon={faLocationDot} /> {profile.location}
                </li>
              )}
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">Followers: {profile.followers}</li>
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ProfileCard
