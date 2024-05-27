import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import {Profile} from '../interfaces/profile'
import ProfileShortCard from './profileShortCard'

interface PedigreeNodeProps {
  profile: Profile
}

const Pedigree: React.FC<PedigreeNodeProps> = ({profile}) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          {profile.mother && (
            <Col>
              <h5>Mother</h5>
              <ProfileShortCard profile={profile.mother} />
            </Col>
          )}
          {profile.father && (
            <Col>
              <h5>Father</h5>
              <ProfileShortCard profile={profile.father} />
            </Col>
          )}
        </Row>
        {profile.siblings && profile.siblings.length > 0 && (
          <Row className="mt-3">
            <Col>
              <h5>Siblings</h5>
              <Row>
                {profile.siblings.map((sibling) => (
                  <Col key={sibling.id}>
                    <ProfileShortCard profile={sibling} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
        {profile.children && profile.children.length > 0 && (
          <Row className="mt-3">
            <Col>
              <h5>Children</h5>
              <Row>
                {profile.children.map((child) => (
                  <Col key={child.id}>
                    <ProfileShortCard profile={child} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  )
}

export default Pedigree
