import React from 'react'
import { Nav } from "react-bootstrap"
import "./nav.css"

function NavBar() {
    return (
 <Nav variant="tabs" defaultActiveKey="/home" className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Nav.Item>
    <Nav.Link href="/" className="navlink">Google Books Search</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/traveled" eventKey="link-1" className="navlink">SEARCH</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/chat" eventKey="link-2" className="navlink">SAVED</Nav.Link>
  </Nav.Item>
</Nav>
    )
}

export default NavBar
