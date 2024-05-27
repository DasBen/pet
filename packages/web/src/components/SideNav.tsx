import React from 'react'
import {Accordion, Button, ButtonGroup, Card, Dropdown, DropdownButton, Nav} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faHome,
  faUser,
  faCompass,
  faEnvelope,
  faBell,
  faCog,
  faPaw
} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import HoverButton from './hoverButton'

const SideNav: React.FC = () => {
  return (
    <>
      <Card className="border-0">
        <Card.Body className="p-0">
          <ButtonGroup vertical className="w-100">
            <Link
              to="/"
              className="btn btn-block btn-outline-secondary text-start border-0 text-reset text-muted rounded-1 text-center"
            >
              <h1>
                <FontAwesomeIcon icon={faPaw} /> Pet
              </h1>
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
      <Card className="mt-3 rounded-bottom-0 border-bottom-0">
        <Card.Header className="p-0">
          <Link
            to="/"
            className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 border-0 text-reset text-muted rounded-1 text-start w-100"
          >
            <FontAwesomeIcon icon={faHome} className="me-2" /> HomePage
          </Link>
        </Card.Header>
      </Card>
      {/* Explore */}
      <Card className="border-bottom-0 rounded-0">
        <Card.Header className="p-0">
          <Link
            to="/explore"
            className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0  border-0 text-reset text-muted rounded-1 text-start w-100"
          >
            <FontAwesomeIcon icon={faCompass} className="me-2" /> Explore
          </Link>
        </Card.Header>
      </Card>
      {/* Messages */}
      <Card className="border-bottom-0 rounded-0">
        <Card.Header className="p-0">
          <Link
            to="/messages"
            className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0  border-0 text-reset text-muted rounded-1 text-start w-100"
          >
            <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Messages
          </Link>
        </Card.Header>
      </Card>
      {/* Profile */}
      <Card className="rounded-0 border-top-0">
        <Card.Header className="p-0">
          <Link
            to="/profile"
            className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0  rounded-top-0 border-0 text-reset text-muted rounded-1 text-start w-100"
          >
            <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
          </Link>
        </Card.Header>
        <Card.Body className="p-0">
          <ButtonGroup vertical className="w-100">
            <Link
              to="/profile/1"
              className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              User
            </Link>
            <Link
              to="/profile/2"
              className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              Caretaker
            </Link>
            <Link
              to="/profile/3"
              className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              Organization
            </Link>
            <Link
              to="/profile/4"
              className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              Animal
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
      {/* Settings */}
      <Card className="rounded-top-0 border-top-0">
        <Card.Header className="p-0">
          <Link
            to="/settings"
            className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1 text-start w-100"
          >
            <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
          </Link>
        </Card.Header>
        <Card.Body className="p-0">
          <ButtonGroup vertical className="w-100">
            <Link
              to="/settings/account"
              className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              Account
            </Link>
            <Link
              to="/settings/privacy"
              className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              Privacy
            </Link>
            <Link
              to="/settings/security"
              className="btn btn-block btn-outline-secondary text-start rounded-bottom-0 rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              Security
            </Link>
            <Link
              to="/settings/contact"
              className="btn btn-block btn-outline-secondary text-start rounded-top-0 border-0 text-reset text-muted rounded-1"
            >
              Contact
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
      {/* Create Dropdown */}

      <Dropdown as={ButtonGroup} className="mt-3 w-100">
        <Dropdown.Toggle variant="outline-success" id="create-dropdown">
          <FontAwesomeIcon icon={faCog} className="me-2" /> Create
        </Dropdown.Toggle>
        <Dropdown.Menu className="py-0">
          <Dropdown.Item href="/create/1">Post</Dropdown.Item>
          <Dropdown.Item href="/create/1">Pet</Dropdown.Item>
          <Dropdown.Item href="/create/2">Service</Dropdown.Item>
          <Dropdown.Item href="/create/3">Event</Dropdown.Item>
          <Dropdown.Item href="/create/4">Organization</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default SideNav
