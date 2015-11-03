'use strict'

import { combineReducers } from 'redux'
import shortid from 'shortid'

import { actionTypes } from './constants'

const {
  ADD_<% TEMPLATE_TOKEN singular upperCase %>,
  UPDATE_<% TEMPLATE_TOKEN singular upperCase %>,
  DELETE_<% TEMPLATE_TOKEN singular upperCase %>,
} = actionTypes;


const <% TEMPLATE_TOKEN %>Reducer = combineReducers({
  entities: entitiesReducer,
  condition: conditionReducer
});

function entitiesReducer(state={}, action) {
  switch (action.type) {

  case ADD_<% TEMPLATE_TOKEN singular upperCase %>:
    return add<% TEMPLATE_TOKEN singular capitalize %>(state, action.params);

  case UPDATE_<% TEMPLATE_TOKEN singular upperCase %>:
    return update<% TEMPLATE_TOKEN singular capitalize %>(state, action.id, action.params);

  case DELETE_<% TEMPLATE_TOKEN singular upperCase %>:
    return delete<% TEMPLATE_TOKEN singular capitalize %>(state, action.id);
  }

  return state;
}

function conditionReducer(state={}, action) {
  switch (action.type) {
  }

  return state;
}

function add<% TEMPLATE_TOKEN singular capitalize %>(state, params) {
  const id =shortid.generate();

  return {
    [id]: {
      id,
      params
    },
    ...state
  };
}

function update<% TEMPLATE_TOKEN singular capitalize %>(state, id, params) {
  return _.mapValues(state, <% TEMPLATE_TOKEN singular %> =>
    <% TEMPLATE_TOKEN singular %>.id === id ?
    Object.assign({}, <% TEMPLATE_TOKEN singular %>, {
      params
    }) :
    <% TEMPLATE_TOKEN singular %>
  );
}

function delete<% TEMPLATE_TOKEN singular capitalize %>(state, id) {
  return _.pick(state, <% TEMPLATE_TOKEN singular %> =>
    <% TEMPLATE_TOKEN singular %>.id !== id
  );
}

export default <% TEMPLATE_TOKEN %>Reducer;