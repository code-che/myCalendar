import {useEffect} from 'react';
import Head from "next/head";
import {connect} from 'react-redux';

const Home = ({events, dispatch}) => {

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <Head>
                <title>CodeChe Calendar</title>
                <script src="https://apis.google.com/js/client.js"></script>
            </Head>
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
