import { useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/Home.module.css';
import googleApiConfigs from '../googleApiConfigs';

let gapi = null;

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
      // authorizeButton.onclick = handleAuthClick;
      // signoutButton.onclick = handleSignoutClick;
    },
    (e) => console.log(e)
  );
};

const updateSigninStatus = (isSignedIn) => {
  console.log('updateSigninStatus');
  if (isSignedIn) {
    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    // authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
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
      console.log(events, '--- events ---');
    });
};

const Home = () => {
  useEffect(() => {
    console.log('did mount');
    gapi = window['gapi'];
    handleClientLoad();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://apis.google.com/js/api.js" />
      </Head>

      <div className="mb-2 text-monospace">Sign Status</div>
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAuthClick}
        >
          Sign In
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={handleSignoutClick}
        >
          Sing Out
        </button>
      </div>
    </div>
  );
};

export default Home;
