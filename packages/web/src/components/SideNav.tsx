import React from 'react'
import {Button, ButtonGroup, Nav} from 'react-bootstrap'
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

const SideNav: React.FC = () => {
  return (
    <ButtonGroup vertical>
      <Link
        to="/"
        className="btn btn-block btn-outline-secondary text-start rounded-0 border-0 text-reset text-muted rounded-1 ms-3"
      >
        <h1>
          <FontAwesomeIcon icon={faPaw} /> Pet{' '}
        </h1>
      </Link>
      <Link
        to="/"
        className="btn btn-block btn-outline-secondary text-start rounded-0 border-0 text-reset rounded-1 ms-3"
        title="HomePage"
      >
        <h5>
          <FontAwesomeIcon icon={faHome} className="me-2" /> HomePage{' '}
        </h5>
      </Link>
      <Link
        to="/profile"
        className="btn btn-block btn-outline-secondary text-start rounded-0 border-0 text-reset rounded-1 ms-3"
        title="Profile"
      >
        <h5>
          <FontAwesomeIcon icon={faUser} className="me-2" /> Profile{' '}
        </h5>
      </Link>
      {/* @todo dummy profiles */}
      <ul>
        <li>
          <Nav.Link as={Link} to="/profile/1">
            User
          </Nav.Link>
        </li>
        <li>
          <Nav.Link as={Link} to="/profile/2">
            Caretaker
          </Nav.Link>
        </li>
        <li>
          <Nav.Link as={Link} to="/profile/3">
            Organization
          </Nav.Link>
        </li>
        <li>
          <Nav.Link as={Link} to="/profile/4">
            Animal
          </Nav.Link>
        </li>
      </ul>
      <Link
        to="/explore"
        className="btn btn-block btn-outline-secondary text-start rounded-0 border-0 text-reset rounded-1 ms-3"
        title="Explore"
      >
        <h5>
          <FontAwesomeIcon icon={faCompass} className="me-2" /> Explore{' '}
        </h5>
      </Link>
      <Link
        to="/messages"
        className="btn btn-block btn-outline-secondary text-start rounded-0 border-0 text-reset rounded-1 ms-3"
        title="Messages"
      >
        <h5>
          <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Messages{' '}
        </h5>
      </Link>
      <Link
        to="/notifications"
        className="btn btn-block btn-outline-secondary text-start rounded-0 border-0 text-reset rounded-1 ms-3"
        title="Notifications"
      >
        <h5>
          <FontAwesomeIcon icon={faBell} className="me-2" /> Notifications{' '}
        </h5>
      </Link>
      <Link
        to="/settings"
        className="btn btn-block btn-outline-secondary text-start rounded-0 border-0 text-reset rounded-1 ms-3"
        title="Settings"
      >
        <h5>
          <FontAwesomeIcon icon={faCog} className="me-2" /> Settings{' '}
        </h5>
      </Link>
    </ButtonGroup>
  )
}

export default SideNav
