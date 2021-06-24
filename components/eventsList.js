import {connect} from 'react-redux';
import CommonMethods from "../public/commonMethods";

const EventsList = ({events, dispatch}) => {
    console.log(events);
    return (
        <div className='flex flex-col items-center pt-8 px-4'>
            <button className='w-44 rounded-lg mb-5 p-2 bg-darkcyan shadow-md focus:shadow-none text-white'>
                ایجاد رویداد
            </button>
            {
                events.map((event, index) =>
                    <div key={index} className='border-2 border-cyan rounded-lg w-full mb-5 p-3 box-border'>
                        <div className='flex justify-between mb-4'>
                            <h2 className='text-2xl'>{event.summary}</h2>
                            <div className='flex'>
                                <p className='ml-5'>{new Date(event.start.dateTime).toLocaleDateString('fa-IR')}</p>
                                <p className='ml-3'>از ساعت</p>
                                <p>{CommonMethods().covertToPersianDigit(event.start.dateTime.slice(event.start.dateTime.indexOf('T')+1, event.start.dateTime.indexOf('T')+6))}</p>
                                <p className='mx-2'>الی</p>
                                <p>{CommonMethods().covertToPersianDigit(event.end.dateTime.slice(event.end.dateTime.indexOf('T')+1, event.end.dateTime.indexOf('T')+6))}</p>
                            </div>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <p className='w-8/12'>{event.description}</p>
                            {
                                event.recurringEventId ?
                                    <p>تکرار شونده</p>
                                    :
                                    null
                            }
                        </div>

                    </div>
                )
            }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        events: state.events,
    }
};

export default connect(mapStateToProps)(EventsList);