import {useEffect} from 'react';
import {connect} from 'react-redux';

const Home = ({events, dispatch}) => {

    useEffect(() => {
    }, []);

    return (
        <div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        events: state.events,
    }
};

export default connect(mapStateToProps)(Home);
