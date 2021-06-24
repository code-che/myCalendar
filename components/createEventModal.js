import {useState} from 'react';
import {connect} from "react-redux";
import Modal from 'react-modal';
import { DatePicker } from "jalali-react-datepicker";
import modalStyle from '../styles/Modal.module.css';

const CreateEventModal = ({modal, dispatch}) => {

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');

    const closeModal = () => {
        dispatch({
            type: 'CLOSE-MODAL',
        })
    };

    const handleClickOnSubmit = event => {
        event.preventDefault();
        // if (validation()) {
        //
        // }
    };

    const validation = () => {
        if(titleInput === '') {
            return false
        }
        return true;
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
                                <DatePicker className='border-gray border-2 rounded-md'/>
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
    }
};

export default connect(mapStateToProps)(CreateEventModal);