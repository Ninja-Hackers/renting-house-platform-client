import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/houses'>
              Houses
            </Nav.Link>
            {isLoggedIn && (
              <>
                <NavDropdown title='My Details' id='basic-nav-dropdown'>
                  <NavDropdown.Item as={Link} to='/my-houses'>
                    My Houses
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/my-reservations'>
                    My reservations
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to='/'>
                  {user && user.name}
                </Nav.Link>
                <Nav.Link as={Link} onClick={logOutUser} to='/'>
                  Logout
                </Nav.Link>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
