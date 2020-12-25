import { useEffect, useState } from 'react';
import moment from 'moment';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import googleApiConfigs from '../googleApiConfigs';

let gapi = null;

const Home = () => {
  const [signedIn, setSign] = useState(false);
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    console.log('did mount');
    gapi = window['gapi'];
    handleClientLoad();
  }, []);

  return (
    <div className="p-5">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://apis.google.com/js/api.js" />
      </Head>

      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAuthClick}
          disabled={!signedIn}
        >
          Sign In
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={handleSignoutClick}
          disabled={signedIn}
        >
          Sing Out
        </button>

        {!signedIn ? (
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Due</th>
                <th scope="col">Description</th>
                <th scope="col">Recurring</th>
              </tr>
            </thead>
            <tbody>
              {console.log(events)}
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
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
