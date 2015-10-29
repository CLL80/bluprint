'use strict'

import { combineReducers } from 'redux'
import shortid from 'shortid'

import { actionTypes } from './constants'

const {
  ADD_<% TEMPLATE_NAME singular uppercase %>,
  UPDATE_<% TEMPLATE_NAME singular uppercase %>,
  DELETE_<% TEMPLATE_NAME singular uppercase %>,
} = actionTypes;


const <% TEMPLATE_NAME %>Reducer = combineReducers({
  entities: entitiesReducer,
  condition: conditionReducer
});

function entitiesReducer(state={}, action) {
  switch (action.type) {

  case ADD_<% TEMPLATE_NAME singular uppercase %>:
    return add<% TEMPLATE_NAME singular capitalize %>(state, action.params);

  case UPDATE_<% TEMPLATE_NAME singular uppercase %>:
    return update<% TEMPLATE_NAME singular capitalize %>(state, action.id, action.params);

  case DELETE_<% TEMPLATE_NAME singular uppercase %>:
    return delete<% TEMPLATE_NAME singular capitalize %>(state, action.id);
  }

  return state;
}

function conditionReducer(state={}, action) {
  switch (action.type) {
  }

  return state;
}

function add<% TEMPLATE_NAME singular capitalize %>(state, params) {
  const id =shortid.generate();

  return {
    [id]: {
      id,
      params
    },
    ...state
  };
}

function update<% TEMPLATE_NAME singular capitalize %>(state, id, params) {
  return _.mapValues(state, <% TEMPLATE_NAME singular %> =>
    <% TEMPLATE_NAME singular %>.id === id ?
    Object.assign({}, <% TEMPLATE_NAME singular %>, {
      params
    }) :
    <% TEMPLATE_NAME singular %>
  );
}

function delete<% TEMPLATE_NAME singular capitalize %>(state, id) {
  return _.pick(state, <% TEMPLATE_NAME singular %> =>
    <% TEMPLATE_NAME singular %>.id !== id
  );
}

export default <% TEMPLATE_NAME %>Reducer;