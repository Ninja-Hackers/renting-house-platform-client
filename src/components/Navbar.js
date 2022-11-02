import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const navBtn = {
  backgroundColor: "#7fdff5",
  borderRadius: "6px",
  color: "white",
  margin: "0.3rem 0.3rem",
  fontWeight: "medium",
  padding: "0.5rem 1rem",
};

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="./home-logo.jpg" width="85" height="45" alt="Home logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/houses">
              Houses
            </Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/create-house">
                  Become a Host
                </Nav.Link>
                <NavDropdown title="My Details" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/my-houses">
                    My Houses
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/my-reservations">
                    My reservations
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/">
                  <strong> Hello, {user && user.name}!!!</strong>
                </Nav.Link>
                <Nav.Link as={Link} onClick={logOutUser} style={navBtn} to="/">
                  Logout
                </Nav.Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} style={navBtn} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} style={navBtn} to="/signup">
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
