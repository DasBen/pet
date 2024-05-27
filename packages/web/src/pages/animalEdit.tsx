import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Form, Button, Row, Col, Card, ButtonGroup, Image} from 'react-bootstrap'
import {AnimalInterface} from '@core/entities/animalEntity'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify'
import ApiClient from '../services/AnimalApi'

const apiClient = new ApiClient(import.meta.env.VITE_APP_API_URL)

const AnimalEdit: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()
  const [animal, setAnimal] = useState<AnimalInterface>({
    type: 'animal',
    name: '',
    animalType: 'cat',
    profileImageUrl: 'https://loremflickr.com/128/128/cat?lock=3',
    bannerImageUrl: 'https://loremflickr.com/1920/400/cat?lock=4'
  })

  useEffect(() => {
    async function fetchAnimal() {
      if (id === undefined) {
        return
      }
      const response = await apiClient.getAnimal(id)

      if (response) {
        setAnimal(response)
      }
    }

    fetchAnimal()
  }, [id])

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'banner'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (type === 'profile') {
          setAnimal({...animal, profileImageUrl: reader.result as string})
        } else {
          setAnimal({...animal, bannerImageUrl: reader.result as string})
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, 'banner')
  }

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, 'profile')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setAnimal({...animal, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      let animalResponse: AnimalInterface
      console.log('Submitting animal', animal)
      console.log('ID:', id)
      if (id) {
        animalResponse = await apiClient.editAnimal(animal)
        toast.success('Animal updated successfully. Redirecting...')
      } else {
        animalResponse = await apiClient.createAnimal(animal)
        toast.success('Animal created successfully. Redirecting...')
      }
      navigate(`/animal/${animalResponse.id}`)
    } catch (error) {
      console.error('Failed to create/update animal', error)
      toast.error('Failed to create/update animal')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Header>Add new Pet</Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3 position-relative">
                <Form.Label htmlFor="bannerImageInput">
                  <Image src={animal.bannerImageUrl} fluid thumbnail style={{cursor: 'pointer'}} />
                </Form.Label>
                <Form.Control
                  type="file"
                  id="bannerImageInput"
                  onChange={handleBannerUpload}
                  hidden
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={2}>
              <Form.Group className="mb-3 position-relative">
                <Form.Label htmlFor="profileImageInput">
                  <Image
                    src={animal.profileImageUrl}
                    roundedCircle
                    fluid
                    thumbnail
                    style={{cursor: 'pointer'}}
                  />
                </Form.Label>
                <Form.Control
                  type="file"
                  id="profileImageInput"
                  onChange={handleProfileUpload}
                  hidden
                />
              </Form.Group>
            </Col>
            <Col>
              <Row>
                <Col xs={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={animal.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="animalType">
                    <Form.Label>
                      <FontAwesomeIcon icon={faPaw} /> Type
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="animalType"
                      value={animal.animalType}
                      onChange={handleChange}
                      required
                      className="text-capitalize"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Funding */}
              <Row className="mt-2">
                <Col xs={6}>
                  <Form.Group controlId="monthlyFundingGoal">
                    <Form.Label>Monthly Funding Goal</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      name="monthlyFundingGoal"
                      value={animal.monthlyFundingGoal || 0}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="lifetimeFundingGoal">
                    <Form.Label>Lifetime Funding Goal</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      name="lifetimeFundingGoal"
                      value={animal.lifetimeFundingGoal || 0}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={5}
                  value={animal.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={animal.location}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="p-0">
          <div className="d-grid gap-2">
            <ButtonGroup>
              <Button variant="outline-success" type="submit" className="rounded-top-0">
                Save
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/animal/edit')}
                className="rounded-top-0"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        </Card.Footer>
      </Card>
    </Form>
  )
}

export default AnimalEdit
