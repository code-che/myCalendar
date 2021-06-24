import {connect} from 'react-redux';

const Login = ({googleApi, dispatch}) => {

    const handleClickOnLoginBtn = () => {
        const CLIENT_ID = '419211961546-hl81ad56g30fifhfphmf28ahmnl9l75o.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyDT58Jvmdj2MtPWB9-BiQ7iXbgC-WyhBTk';
        const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
        const SCOPES = "https://www.googleapis.com/auth/calendar.events";
        googleApi.gapi.load('client:auth2', () => {
            googleApi.gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            });

            googleApi.gapi.client.load('calendar', 'v3');
            googleApi.gapi.auth2.getAuthInstance().signIn().then(() => {
                googleApi.gapi.client.calendar.events.list({
                    'calendarId' : 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'singleEvents': true,
                    'orderBy': 'startTime'
                }).then(res => {
                    dispatch({
                        type: 'UPDATE-EVENTS',
                        data: {
                            events: [res.result.items]
                        }
                    });

                    dispatch({
                        type: 'AUTHENTICATED',
                    })

                }).catch(err => {
                    console.log(err);
                })

            })
        })
    };

    return (
        <div className='flex flex-col justify-around items-center w-6/12 h-44 mx-auto mt-10 border-2 border-cyan rounded-lg'>
            <p className=''>برای نمایش رویداد های شما باید ابتدا وارد حساب گوگل تان شوید</p>
            <button className='w-44 rounded-lg p-2 bg-darkblue shadow-md focus:shadow-none text-white'  onClick={handleClickOnLoginBtn}>
                ورود با حساب گوگل
            </button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        googleApi: state.googleApi,
    }
};

export default connect(mapStateToProps)(Login);