import styles from '../styles/Home.module.css';
import { handleAuthClick } from '../utils/googleCalendartApis';
import { Button } from 'react-bootstrap';

const Login = () => {
  return (
    <Button
      className={`${styles['sign-in-button']} d-flex align-items-center justify-content-between`}
      variant="success"
      onClick={handleAuthClick}
    >
      <img
        src="/google-glass-logo.svg"
        alt="Google"
        width={20}
        className="mr-3"
      />
      Sign In
    </Button>
  );
};

export default Login;
