import {useEffect} from 'react';
import Head from "next/head";
import {connect} from 'react-redux';
import Login from "../components/login";
import EventsList from "../components/eventsList";

const Home = ({events, googleApi, dispatch}) => {

    useEffect(() => {
        dispatch({
            type: 'SET-GAPI',
            data: {
                gapi: window.gapi
            }
        })
    }, []);

    return (
        <div>
            <Head>
                <title>تقویم کدچه</title>
                <script src="https://apis.google.com/js/client.js"></script>
            </Head>

            {
                googleApi.isAuthenticated ?
                    events.length > 0 ?
                        <EventsList/>
                        :
                        <div>
                            هیچ رویدادی برای شما تنظیم نشده است
                        </div>
                    :
                    <Login/>
            }

        </div>
    )
};

const mapStateToProps = state => {
    return {
        events: state.events,
        googleApi: state.googleApi
    }
};

export default connect(mapStateToProps)(Home);
