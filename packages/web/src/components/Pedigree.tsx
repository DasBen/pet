import React, {useEffect, useState} from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import {AnimalInterface} from '@core/entities/animalEntity'
import ProfileShortCard from './profileShortCard'
import ApiClient from '../../../core/src/services/AnimalApi'

interface PedigreeNodeProps {
  animal?: AnimalInterface
}

const apiClient = new ApiClient(import.meta.env.VITE_APP_API_URL)

const Pedigree: React.FC<PedigreeNodeProps> = ({animal: profile}) => {
  const [mother, setMother] = useState<AnimalInterface | null>(null)
  const [father, setFather] = useState<AnimalInterface | null>(null)
  const [siblings, setSiblings] = useState<AnimalInterface[]>([])
  const [children, setChildren] = useState<AnimalInterface[]>([])

  useEffect(() => {
    if (!profile) {
      return
    }

    const fetchMother = async () => {
      if (profile.motherId) {
        const response = await apiClient.getAnimal(profile.motherId)
        if (response) {
          setMother(response)
        }
      }
    }

    const fetchFather = async () => {
      if (profile.fatherId) {
        const response = await apiClient.getAnimal(profile.fatherId)
        if (response) {
          setFather(response)
        }
      }
    }

    const fetchSiblings = async () => {
      if (profile.siblings) {
        const response = await Promise.all(profile.siblings.map((id) => apiClient.getAnimal(id)))
        if (response) {
          setSiblings(response)
        }
      }
    }

    const fetchChildren = async () => {
      if (profile.children) {
        const response = await Promise.all(profile.children.map((id) => apiClient.getAnimal(id)))
        if (response) {
          setChildren(response)
        }
      }
    }

    fetchMother()
    fetchFather()
    fetchSiblings()
    fetchChildren()
  }, [profile])

  return (
    <Card>
      <Card.Body>
        <Row>
          {mother && (
            <Col>
              <h5>Mother</h5>
              <ProfileShortCard profile={mother} />
            </Col>
          )}
          {father && (
            <Col>
              <h5>Father</h5>
              <ProfileShortCard profile={father} />
            </Col>
          )}
        </Row>
        {siblings.length > 0 && (
          <Row className="mt-3">
            <Col>
              <h5>Siblings</h5>
              <Row>
                {siblings.map((sibling) => (
                  <Col key={sibling.id}>
                    <ProfileShortCard profile={sibling} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
        {children.length > 0 && (
          <Row className="mt-3">
            <Col>
              <h5>Children</h5>
              <Row>
                {children.map((child) => (
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
