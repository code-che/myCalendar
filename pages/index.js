import { useEffect, useState } from 'react';
import moment from 'moment';
import Head from 'next/head';
import { Button, Col, Form, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/Home.module.css';
import googleApiConfigs from '../googleApiConfigs';

let gapi = null;

const Home = () => {
  const [signedIn, setSign] = useState(false);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [formState, setForm] = useState({ summary: '', description: '' });

  const handleClientLoad = () => {
    console.log('handleClientLoad');
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    document.body.appendChild(script);
    script.onload = () => {
      window['gapi'].load('client:auth2', initClient);
    };
  };

  const initClient = () => {
    console.log('initClient');
    gapi.client.init(googleApiConfigs).then(
      () => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      (e) => console.log(e)
    );
  };

  const updateSigninStatus = (isSignedIn) => {
    console.log('updateSigninStatus');
    if (isSignedIn) {
      setSign(false);
      listUpcomingEvents();
    } else {
      setSign(true);
    }
  };

  const handleAuthClick = () => {
    console.log('handleAuthClick');
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignoutClick = () => {
    console.log('handleSignoutClick');
    gapi.auth2.getAuthInstance().signOut();
  };

  const listUpcomingEvents = () => {
    console.log('listUpcomingEvents');
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      .then((res) => {
        const events = res.result.items;
        setEvents(events);
      });
  };

  const addNewEvent = (event) => {
    const request = gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    request.execute(() => console.log('event added!'));
  };

  useEffect(() => {
    console.log('did mount');
    gapi = window['gapi'];
    handleClientLoad();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewEvent({
      ...formState,
      start: {
        dateTime: '2020-12-26T09:00:00-07:00',
        timeZone: 'Asia/Tehran',
      },
      end: {
        dateTime: '2020-12-26T17:00:00-07:00',
        timeZone: 'Asia/Tehran',
      },
    });
  };

  const handleChange = ({ target }) => {
    setForm({ [target.name]: target.value });
  };

  return (
    <>
      <div className="p-5 position-relative vh-100">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://apis.google.com/js/api.js" />
        </Head>

        {signedIn ? (
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
        ) : (
          <Button
            variant="secondary"
            className={`ml-2 ${styles['sign-out-button']}`}
            onClick={handleSignoutClick}
          >
            Sign Out
          </Button>
        )}

        {!signedIn ? (
          <>
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
                    <td>
                      {moment(event.end.dateTime).format('MMM/DD/YY HH:mm')}
                    </td>
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
        ) : null}
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Row>
              <Col xs={12}>
                <Form.Group controlId="formGroupSummary">
                  <Form.Label>Summary</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Summary"
                    name="summary"
                    value={formState.summary}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formGroupDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              {/*<Col xs={6}>*/}
              {/*  <Form.Group controlId="formGroupStartDate">*/}
              {/*    <Form.Label>Start Date</Form.Label>*/}
              {/*    <Form.Control type="text" placeholder="Start Date" />*/}
              {/*  </Form.Group>*/}
              {/*</Col>*/}
              {/*<Col xs={6}>*/}
              {/*  <Form.Group controlId="formGroupEndDate">*/}
              {/*    <Form.Label>End Date</Form.Label>*/}
              {/*    <Form.Control type="text" placeholder="End Date" />*/}
              {/*  </Form.Group>*/}
              {/*</Col>*/}
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Home;
