import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PeopleFill, FileEarmarkTextFill, CalendarCheckFill } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col>
        <PeopleFill size={100} />
        <h1>Multiple Users</h1>
        <h5>
          This address book enables any number of users to register
          and save their business contacts. You can only see the
          contacts you have created.
        </h5>
      </Col>
      <Col>
        <FileEarmarkTextFill size={100} />
        <h1>Contact Details</h1>
        <h5>
          For each contact, you can save their name, address, and phone number.
        </h5>
      </Col>
      <Col>
        <CalendarCheckFill size={100} />
        <h1>Timestamped Notes</h1>
        <h5>
          Each time you make contact with a contact, you can write
          a note that summarizes the conversation. This note is
          saved along with a timestamp with the contact.
        </h5>
      </Col>

    </Row>
  </Container>
);

export default Landing;
