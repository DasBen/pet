import React from 'react'
import {Card, Row, Col, Image, ButtonGroup} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCakeCandles, faEdit, faLocationDot, faPaw} from '@fortawesome/free-solid-svg-icons'
import {AnimalInterface} from '@core/entities/animalEntity'
import HoverButton from './hoverButton'

export interface ProfileCardProps {
  profile?: AnimalInterface
}

const getLocation = (profile: AnimalInterface) => {
  const locationString = profile.organizationId ? (
    <a href={`/organization/${profile.organizationId}`} className="text-decoration-none text-muted">
      {profile.organizationId}
    </a>
  ) : (
    profile.location
  )

  if (!locationString) return null

  return (
    <li className="text-muted list-inline-item">
      <FontAwesomeIcon icon={faLocationDot} /> {locationString}
    </li>
  )
}

const AnimalProfileCard: React.FC<ProfileCardProps> = ({profile}) => {
  if (!profile) {
    return null
  }

  return (
    <Card>
      <Card.Img variant="top" src={profile.bannerImageUrl} />
      <Card.Body>
        <Row className="mt-3">
          <Col xs={2}>
            <Image src={profile.profileImageUrl} alt="Profile" roundedCircle fluid />
          </Col>
          <Col>
            <Row>
              <Col>
                <h3>{profile.name}</h3>
              </Col>
              <Col className="text-end">
                <ButtonGroup>
                  <HoverButton>
                    <a href={`/animal/${profile.id}/edit`} className="text-decoration-none">
                      <FontAwesomeIcon icon={faEdit} className="text-muted" />
                    </a>
                  </HoverButton>
                </ButtonGroup>
              </Col>
            </Row>
            <p>{profile.description}</p>
            <ul className="list-inline">
              <li className="text-muted list-inline-item">
                <FontAwesomeIcon icon={faPaw} />{' '}
                <a
                  href={`/type/${profile.type}`}
                  className="text-decoration-none text-muted text-capitalize"
                >
                  {profile.type}
                </a>
              </li>
              {profile.birthday && (
                <li className="text-muted list-inline-item">
                  <FontAwesomeIcon icon={faCakeCandles} /> {profile.birthday} (Age: 2 years)
                </li>
              )}
              {getLocation(profile as AnimalInterface)}
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

export default AnimalProfileCard
