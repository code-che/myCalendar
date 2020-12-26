import { Button, Table } from 'react-bootstrap';
import moment from 'moment';
import styles from '../styles/Home.module.css';
import { handleSignoutClick } from '../utils/googleCalendartApis';

const EventsList = ({ events, setEvents, setShow }) => {
  return (
    <>
      <Button
        variant="secondary"
        className={`ml-2 ${styles['sign-out-button']}`}
        onClick={() => handleSignoutClick(() => setEvents([]))}
      >
        Sign Out
      </Button>
      <Table className="mt-5">
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
              <td>{event.summary}</td>
              <td>{moment(event.end.dateTime).format('MMM/DD/YY HH:mm')}</td>
              <td>
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
    </>
  );
};

export default EventsList;
