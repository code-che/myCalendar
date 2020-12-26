import { Button, Navbar } from 'react-bootstrap';
import { handleSignoutClick } from '../utils/googleCalendartApis';

const Header = ({ setEvents }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Simple Calendar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Button
          variant="secondary"
          onClick={() => handleSignoutClick(() => setEvents([]))}
          className="ml-auto"
        >
          Sign Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
