import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from "react-bootstrap/Offcanvas";

// eslint-disable-next-line react/prop-types
const AppHeader = ({ searchLocation }) => {
  const styles = {
    backgroundImage:
      ' url( "https://images.dailykos.com/images/1183432/story_image/bluesky.jpg?1682792002") ',
      backgroundRepeat:'no-repeat',
      backgroundPosition:' center center',
      backgroundSize:'cover',
    minHeight: "4em",
  };
  const [city, setCity] = useState("");
  const searchHandler = (e) => {
    setCity(e.target.value);

  };
const btnClickHandler=()=>{
  searchLocation(city);
  setCity('')
}
  return (
    <div style={{ marginBottom: "0" }}>
      {["xxl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3"
          style={styles}
        >
          <Container fluid>
            <Navbar.Brand style={{ color: "white" }} href="#">
              Weather App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}` }>
                  Search Your city
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav> */}
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search city"
                    className="me-2"
                    aria-label="Search"
                    value={city}
                    onChange={searchHandler}
                  />
                  <Button
                    style={{background:'white',width:'5em',height:'1.8em'}}
                    className='btn-close'
                    variant="outline-success"
                    onClick={btnClickHandler}
                    disabled={!city.length}
                  >
                    Search
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default AppHeader;
