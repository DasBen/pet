import React from 'react'
import {Card, Row, Col, Image, ProgressBar} from 'react-bootstrap'
import {Animal} from '../interfaces/animal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCakeCandles, faLocationDot, faPaw} from '@fortawesome/free-solid-svg-icons'

export interface ProfileCardProps {
  profile: Animal
}

const getProgressBarVariant = (value: number) => {
  if (value < 30) {
    return 'danger'
  } else if (value <= 80) {
    return 'warning'
  } else if (value >= 100) {
    return 'success'
  }
  return 'info'
}

const ProfileCard: React.FC<ProfileCardProps> = ({profile}) => {
  const minProgressForLabel = 25
  let monthlyProgress = 0
  if (profile.monthlyFundingCurrent !== undefined && profile.monthlyFundingGoal !== undefined) {
    monthlyProgress = Math.max(
      minProgressForLabel,
      (profile.monthlyFundingCurrent / profile.monthlyFundingGoal) * 100
    )
  }
  let lifetimeProgress = 0
  if (profile.lifetimeFundingCurrent !== undefined && profile.lifetimeFundingGoal !== undefined) {
    lifetimeProgress = Math.max(
      minProgressForLabel,
      (profile.lifetimeFundingCurrent / profile.lifetimeFundingGoal) * 100
    )
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
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <ul className="list-inline">
              <li className="text-muted list-inline-item">
                <FontAwesomeIcon icon={faPaw} />{' '}
                <a href={`/type/${profile.type}`} className="text-decoration-none text-muted">
                  {profile.type}
                </a>
              </li>
              <li className="text-muted list-inline-item">
                <FontAwesomeIcon icon={faCakeCandles} /> {profile.birthday} (Age: 2 years)
              </li>
              {/* @todo use organization if present */}
              <li className="text-muted list-inline-item">
                <FontAwesomeIcon icon={faLocationDot} />{' '}
                {profile.organization ? (
                  <a
                    href={`/organization/${profile.organization.id}`}
                    className="text-decoration-none text-muted"
                  >
                    {profile.organization.name}
                  </a>
                ) : (
                  profile.location
                )}
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">Followers: {profile.followers}</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h4>Funding Goal (Monthly)</h4>
            <ProgressBar
              striped
              now={monthlyProgress}
              variant={getProgressBarVariant(monthlyProgress)}
              label={`$${profile.monthlyFundingCurrent} / $${profile.monthlyFundingGoal}`}
            />
          </Col>
          <Col>
            <h4>Funding Goal (Lifetime)</h4>
            <ProgressBar
              striped
              now={lifetimeProgress}
              variant={getProgressBarVariant(lifetimeProgress)}
              label={`$${profile.lifetimeFundingCurrent} / $${profile.lifetimeFundingGoal}`}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ProfileCard
