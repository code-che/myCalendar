import {connect} from 'react-redux';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

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
        <div>
            <p>برای نمایش رویداد های شما باید ابتدا وارد حساب گوگل تان شوید</p>
            <button onClick={handleClickOnLoginBtn}>
                ورود با حساب گوگل
            </button>
        </div>
    )
};

const mapStateToPropsLogin = state => {
    return {
        googleApi: state.googleApi,
    }
};

export default connect(mapStateToPropsLogin)(Login);