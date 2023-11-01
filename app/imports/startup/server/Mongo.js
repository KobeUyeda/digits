import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuffs/Stuffs.js';
import { Contacts } from '../../api/contacts/Contacts.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

const addDataContacts = (data) => {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default data.');
    Meteor.settings.defaultContacts.forEach(data => addDataContacts(data));
  }
}
