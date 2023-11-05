import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../api/contacts/Contacts';
import { Notes } from '../../api/notes/Notes';
import Contact from '../components/Contact';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const notesSubscription = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const noteRdy = notesSubscription.ready();
    // Get the Stuff documents
    const contactItems = Contacts.collection.find({}).fetch();
    const NoteItems = Notes.collection.find({}).fetch();
    return {
      notes: NoteItems,
      contacts: contactItems,
      ready: rdy && noteRdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
        </Col>
        <Row>
          {contacts.map((contact, ind) => (
            <Col>
              <Contact key={ind} contact={contact} notes={notes.filter(note => (note.contactId === contact._id))} />
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;
