import {useState} from 'react';
import {connect} from "react-redux";
import Modal from 'react-modal';
import { DatePicker } from "jalali-react-datepicker";
import modalStyle from '../styles/Modal.module.css';

const CreateEventModal = ({modal, googleApi, dispatch}) => {

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [date, setDate] = useState(new Date());

    const closeModal = () => {
        dispatch({
            type: 'CLOSE-MODAL',
        })
    };

    const submitDate = e => {
        setDate(new Date(e.value._d));
    };

    const handleClickOnSubmit = event => {
        event.preventDefault();
        if (titleInput !== '') {
            let endTime = new Date(date.getTime() + 1800000);
            let event = {
                'summary': titleInput,
                'description': descriptionInput,
                'start': {
                    'dateTime': date,
                    'timeZone': 'Asia/Tehran'
                },
                'end': {
                    'dateTime': endTime,
                    'timeZone': 'Asia/Tehran'
                },
                'reminders': {
                    'useDefault': true,
                }
            };

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

                let request = googleApi.gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                });
                request.execute(event => {
                    dispatch({
                        type: 'ADD-EVENT',
                        data: {
                            event
                        }
                    });
                    closeModal();
                })
            });
        }
    };

    return (
        <div>
            <Modal
                isOpen={modal.isOpen}
                onRequestClose={closeModal}
                className={modalStyle.modalContent}
                contentLabel="Example Modal"
            >
                <div className='flex flex-col items-center border-2 rounded-lg border-darkgray p-5 bg-white'>
                    <h2 className='text-2xl mb-5'>ایجاد رویداد جدید</h2>
                    <form className='flex flex-col items-center w-full' onSubmit={handleClickOnSubmit}>
                        <div className='flex justify-between w-full mb-4'>
                            <label className='w-2/12' htmlFor="title">عنوان:</label>
                            <input className='w-10/12 px-1 border-gray border-2 rounded-md'
                                   id='title'
                                   value={titleInput}
                                   onChange={e => setTitleInput(e.target.value)}/>
                        </div>
                        <div className='flex justify-between w-full mb-4'>
                            <label className='w-2/12' htmlFor="description">توضیحات:</label>
                            <textarea className='w-10/12 px-1 border-gray border-2 rounded-md'
                                      id="description"
                                      cols="30"
                                      rows="5"
                                      value={descriptionInput}
                                      onChange={e => setDescriptionInput(e.target.value)}/>
                        </div>
                        <div className='flex justify-between w-full mb-4'>
                            <label className='w-2/12'>زمان:</label>
                            <div className='border-cyan'>
                                <DatePicker className='border-gray border-2 rounded-md' onClickSubmitButton={e=> submitDate(e)}/>
                            </div>
                        </div>
                        <button type='submit'
                                className='w-44 rounded-lg mb-5 mx-auto p-2 bg-darkgreen shadow-md focus:shadow-none text-white'
                        >
                            ثبت
                        </button>
                    </form>
                </div>
            </Modal>
        </div>

    )
};

const mapStateToProps = state => {
    return {
        modal: state.modal,
        googleApi: state.googleApi,
    }
};

export default connect(mapStateToProps)(CreateEventModal);