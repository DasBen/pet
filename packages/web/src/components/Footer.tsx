import {Container, Row, Col} from 'react-bootstrap'

function Footer() {
  return (
    <>
      <footer className="footer bg-body-secondary border-top mt-auto">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md="auto">
              <span className="text-body-secondary">© 2024 Benjamin Pahl</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
