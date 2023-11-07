import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contacts/Contacts.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.=
const addDataContacts = (data) => {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default data.');
    Meteor.settings.defaultContacts.forEach(data => addDataContacts(data));
  }
}
