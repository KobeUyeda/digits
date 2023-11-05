import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Notes } from '../../api/notes/Notes';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  createdAt: Date,
  note: String,
  contactId: String,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddNote = ({ Owner, ContactId }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { createdAt, note, contactId, owner } = data;
    Notes.collection.insert(
      { createdAt, note, contactId, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="note" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" value={Owner} />
                <HiddenField name="contactId" value={ContactId} />
                <HiddenField name="createdAt" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddNote.propTypes = {
  Owner: PropTypes.string.isRequired,
  ContactId: PropTypes.string.isRequired,
};

export default AddNote;
