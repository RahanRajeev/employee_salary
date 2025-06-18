import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Adminhome = () => {
  return (
    <div>
         <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        
        {/* <Image src={logo} className='homelogo' roundedCircle /> */}
        <Navbar.Brand>Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/viewprofile">Profile</Nav.Link>
            {/* <Nav.Link href="#pricing">Manage Budget</Nav.Link> */}
           
          </Nav>
          <Nav>
          <NavDropdown title="Manage" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/managecatagory">catagory</NavDropdown.Item>
              <NavDropdown.Item href="/viewcategory">View catagory</NavDropdown.Item>
              
            </NavDropdown>
            <NavDropdown title="View" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/viewcomplaint">View Complaint</NavDropdown.Item>
              <NavDropdown.Item href="/viewuser">View Users</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link eventKey={2} href="/login" >
              Blocked Users
            </Nav.Link>
            <Nav.Link eventKey={2} href="/viewreview" >
              Reviews
            </Nav.Link>
            <Nav.Link eventKey={2} href="/adminchangepass" >
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

export default Adminhome