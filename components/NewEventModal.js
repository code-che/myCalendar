import { Button, Col, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { addNewEvent } from '../utils/googleCalendartApis';

const NewEventModal = ({ setShow, show }) => {
  const [formState, setForm] = useState({ summary: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewEvent({
      ...formState,
      //FIXME: It's hardcode!!!
      start: {
        dateTime: '2020-12-26T09:00:00-07:00',
        timeZone: 'Asia/Tehran',
      },
      end: {
        dateTime: '2020-12-26T17:00:00-07:00',
        timeZone: 'Asia/Tehran',
      },
    });
  };

  const handleChange = ({ target }) => {
    setForm({ [target.name]: target.value });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
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
            {/*<Col xs={6}>*/}
            {/*  <Form.Group controlId="formGroupStartDate">*/}
            {/*    <Form.Label>Start Date</Form.Label>*/}
            {/*    <Form.Control type="text" placeholder="Start Date" />*/}
            {/*  </Form.Group>*/}
            {/*</Col>*/}
            {/*<Col xs={6}>*/}
            {/*  <Form.Group controlId="formGroupEndDate">*/}
            {/*    <Form.Label>End Date</Form.Label>*/}
            {/*    <Form.Control type="text" placeholder="End Date" />*/}
            {/*  </Form.Group>*/}
            {/*</Col>*/}
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
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
