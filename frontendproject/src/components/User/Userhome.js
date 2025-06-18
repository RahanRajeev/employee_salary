import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Userhome = () => {

  return (
    <div>
       <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        
        {/* <Image src={logo} className='homelogo' roundedCircle /> */}
        <Navbar.Brand>SwiftCart</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/viewprofile">Profile</Nav.Link>
            {/* <Nav.Link href="#pricing">Manage Budget</Nav.Link> */}
            <NavDropdown title="Manage" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/addbudget">Add Budget</NavDropdown.Item>
              <NavDropdown.Item href="/addexpense">
                Add Expense
              </NavDropdown.Item>
              <NavDropdown.Item href="/viewexpense">
                View Expense
              </NavDropdown.Item>
              
            </NavDropdown>
           
          </Nav>
          <Nav>
          
            <NavDropdown title="Complaint" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/complaint">Add Complaint</NavDropdown.Item>
              <NavDropdown.Item href="/viewreply">
                View Reply
              </NavDropdown.Item>
             
            </NavDropdown>

            <Nav.Link eventKey={2} href="/login" >
              View Graph
            </Nav.Link>
            <Nav.Link eventKey={2} href="/addreview" >
              Review
            </Nav.Link>
            <Nav.Link eventKey={2} href="/changepassword" >
              Change Password
            </Nav.Link>
            <Nav.Link eventKey={2} href="/" >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default Userhome