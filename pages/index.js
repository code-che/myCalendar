import { useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import { handleClientLoad } from '../utils/googleCalendartApis';
import { EventsList, Login, NewEventModal } from '../components';

let gapi = null;

const Home = () => {
  const [signedIn, setSign] = useState(false);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log('did mount');
    gapi = window['gapi'];
    handleClientLoad(
      () => setSign(false),
      () => setSign(true),
      setEvents
    );
  }, []);

  return (
    <>
      <div className="p-5 position-relative vh-100">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://apis.google.com/js/api.js" />
        </Head>

        {signedIn ? (
          <Login />
        ) : (
          <EventsList events={events} setEvents={setEvents} setShow={setShow} />
        )}
      </div>

      <NewEventModal show={show} setShow={setShow} />
    </>
  );
};

export default Home;
