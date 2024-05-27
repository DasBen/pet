import {useState} from 'react'
import {Container, Navbar, Nav, Image, Dropdown} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faBell, faInbox} from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed)
  }

  return (
    <Navbar expand="lg" className="bg-body-secondary sticky-top border-bottom">
      <Container fluid>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faYoutube} />
          &nbsp;Project Pet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleNavbarToggle} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto" activeKey={window.location.pathname}>
            <Nav.Link href="/animals">Animals</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/customer/inbox">
              <FontAwesomeIcon icon={faInbox} className="me-2" />
              {!isNavbarCollapsed && 'Inbox'}
            </Nav.Link>
            <Nav.Link href="/customer/notification">
              <FontAwesomeIcon icon={faBell} className="me-2" />
              {!isNavbarCollapsed && 'Notification'}
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="text-decoration-none text-reset"
              >
                <Image
                  src="https://loremflickr.com/64/64?lock=7388467904380928"
                  roundedCircle
                  className="me-2 header-profile-picture"
                />
                {!isNavbarCollapsed && 'Account'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/user/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/user/subscription">Subscription</Dropdown.Item>
                <Dropdown.Item href="/user/billing">Billing</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

// return (
//   <Navbar expand="lg" className="bg-body-tertiary sticky-top">
//     <Container>
//       <Navbar.Brand href="/">
//         <FontAwesomeIcon icon={faYoutube} />
//         &nbsp;Project Pet
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="navbar-nav" />
//       <Navbar.Collapse id="navbar-nav">
//         <Nav className="me-auto" activeKey={window.location.pathname}>
//           {/* <Nav.Link href="/reviews">Reviews</Nav.Link> */}
//         </Nav>
//         <Nav className="justify-content-end">
//           <Nav.Link href="/login">Login</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Container>
//   </Navbar>
// )

export default Header
