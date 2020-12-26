import googleApiConfigs from '../googleApiConfigs';

export const handleClientLoad = (
  callbackTrue,
  callbackFalse,
  eventsCallback
) => {
  console.log('handleClientLoad');
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';
  document.body.appendChild(script);
  script.onload = () => {
    window['gapi'].load('client:auth2', () =>
      initClient(callbackTrue, callbackFalse, eventsCallback)
    );
  };
};

export const initClient = (callbackTrue, callbackFalse, eventsCallback) => {
  console.log('initClient');
  gapi.client.init(googleApiConfigs).then(
    () => {
      gapi.auth2
        .getAuthInstance()
        .isSignedIn.listen(() =>
          updateSigninStatus(
            gapi.auth2.getAuthInstance().isSignedIn.get(),
            callbackTrue,
            callbackFalse,
            eventsCallback
          )
        );

      updateSigninStatus(
        gapi.auth2.getAuthInstance().isSignedIn.get(),
        callbackTrue,
        callbackFalse,
        eventsCallback
      );
    },
    (e) => console.log(e)
  );
};

export const updateSigninStatus = (
  isSignedIn,
  callbackTrue,
  callbackFalse,
  eventsCallback
) => {
  console.log('updateSigninStatus');
  if (isSignedIn) {
    // setSign(false);
    callbackTrue();
    listUpcomingEvents(eventsCallback);
  } else {
    // setSign(true);
    callbackFalse();
  }
};

export const handleAuthClick = () => {
  console.log('handleAuthClick');
  gapi.auth2.getAuthInstance().signIn();
};

export const handleSignoutClick = (callback) => {
  console.log('handleSignoutClick');
  gapi.auth2.getAuthInstance().signOut();
  callback();
};

export const listUpcomingEvents = (callback) => {
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
      callback(events);
    });
};

export const addNewEvent = (event) => {
  const request = gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });

  request.execute(() => console.log('event added!'));
};
