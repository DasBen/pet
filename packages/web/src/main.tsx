// In your main index.js or App.js file where you render the layout components
import React from 'react'
import ReactDOM from 'react-dom/client'
import Footer from './components/Footer.tsx'
import {BrowserRouter} from 'react-router-dom'
import Routes from './routes.tsx'
import {Slide, ToastContainer} from 'react-toastify'

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './css/index.css'

// JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import SideNav from './components/SideNav.tsx'
import {Col, Container, Row} from 'react-bootstrap'
import RightSidebar from './components/RightSidebar.tsx'
import {Hashtag} from './interfaces/Hashtag.ts'

const trendingHashtags: Hashtag[] = [
  {tag: 'adoptme', count: 100},
  {tag: 'birthday', count: 50},
  {tag: 'adorable', count: 30},
  {tag: 'donate', count: 20}
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer
        theme="dark"
        position="top-center"
        transition={Slide}
        stacked
        draggable
        closeOnClick
      />
      <Container fluid className="content">
        <Row className="gx-4">
          <Col xs={3} md={3} xl={2} xxl={2} style={{maxWidth: '250px'}} className="text-center">
            <SideNav />
          </Col>
          <Col>
            <Routes />
          </Col>
          <Col xs={4} md={3} xl={3} xxl={3} style={{maxWidth: '350px'}}>
            <RightSidebar trendingHashtags={trendingHashtags} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)
