import { SET_ALERT, REMOVE_ALERT } from '../types';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { id, msg, type },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
