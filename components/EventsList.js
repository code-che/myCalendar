import { Button, Container, Table } from 'react-bootstrap';
import moment from 'moment';
import styles from '../styles/Home.module.css';

const EventsList = ({ events, setShow }) => {
  return (
    <Container className="pt-5 overflow-auto">
      <Table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Due</th>
            <th scope="col">Description</th>
            <th scope="col">Recurring</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td className="text-truncate summary">{event.summary}</td>
              <td>{moment(event.end.dateTime).format('MMM/DD/YY HH:mm')}</td>
              <td className="text-truncate description">
                {event.description?.indexOf('<') === 0
                  ? null
                  : event.description}
              </td>
              <td>{event.recurringEventId ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="primary"
        className={styles['floating-button']}
        onClick={() => setShow(true)}
      >
        <img
          src="/plus.svg"
          alt="Plus"
          width={35}
          className={styles['plus-icon']}
        />
      </Button>
    </Container>
  );
};

export default EventsList;
