import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types';
import uuid from 'uuid';
import ContactReducer from './contactReducer';
import ContactContext from './contactContext';
import React, { useReducer } from 'react';
import contactReducer from './contactReducer';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Daniel James',
        email: 'danyj@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Robert Williams',
        email: 'robbie@gmail.com',
        phone: '222-222-2222',
        type: 'professional',
      },
      {
        id: 3,
        name: 'Graig Rob',
        email: 'robg@gmail.com',
        phone: '333-333-3333',
        type: 'personal',
      },
    ],
  };

  const [state, dispatch] = useReducer(ContactContext, initialState);

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
