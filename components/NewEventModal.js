import { Button, Col, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import moment from 'moment';
import { addNewEvent } from '../utils/googleCalendartApis';

const NewEventModal = ({ setShow, show }) => {
  const [formState, setForm] = useState({
    summary: '',
    description: '',
    startDate: '',
    endDate: '',
    recurrence: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewEvent({
      summary: formState.summary,
      description: formState.description,
      start: {
        dateTime: moment(formState.startDate, 'MM/DD/YYYY HH:mm').format(),
        timeZone: 'Asia/Tehran',
      },
      end: {
        dateTime: moment(formState.endDate, 'MM/DD/YYYY HH:mm').format(),
        timeZone: 'Asia/Tehran',
      },
      recurrence: [formState.recurrence],
    });

    handleModal();
  };

  const handleChange = ({ target }) => {
    setForm({ ...formState, [target.name]: target.value });
  };

  const handleModal = () => {
    setShow(false);
    setForm({
      summary: '',
      description: '',
      startDate: '',
      endDate: '',
      recurrence: [],
    });
  };

  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Row>
            <Col xs={12}>
              <Form.Group controlId="formGroupSummary">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Summary"
                  name="summary"
                  value={formState.summary}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formGroupStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Start Date"
                  name="startDate"
                  value={formState.startDate}
                  onChange={handleChange}
                />
                <div className="text-muted d-flex align-items-center mt-1">
                  <img
                    src="/exclamation-circle.svg"
                    alt="Hint"
                    className="mr-2"
                    width={15}
                  />
                  <small>12/02/2020 17:30</small>
                </div>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formGroupEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="End Date"
                  name="endDate"
                  value={formState.endDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="formGroupRecurrence">
                <Form.Label>Recurrence</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Recurrence"
                  name="recurrence"
                  value={formState.recurrence}
                  onChange={handleChange}
                />
                <div className="text-muted d-flex align-items-center mt-1">
                  <img
                    src="/exclamation-circle.svg"
                    alt="Hint"
                    className="mr-2"
                    width={15}
                  />
                  <small>
                    According to RFC5545. example:{' '}
                    <span className="text-info">RRULE:FREQ=DAILY;COUNT=2</span>
                  </small>
                </div>
              </Form.Group>
            </Col>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewEventModal;
