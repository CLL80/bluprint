'use strict'

import { actionTypes } from './constants'

const {
  ADD_<% TEMPLATE_NAME singular uppercase %>,
  UPDATE_<% TEMPLATE_NAME singular uppercase %>,
  DELETE_<% TEMPLATE_NAME singular uppercase %>,
} = actionTypes;

export function add<% TEMPLATE_NAME singular capitalize %>(params) {
  return { type: ADD_<% TEMPLATE_NAME singular uppercase %>, params};
}

export function update<% TEMPLATE_NAME singular capitalize %>(id, params) {
  return { type: UPDATE_<% TEMPLATE_NAME singular uppercase %>, id, params };
}

export function delete<% TEMPLATE_NAME singular capitalize %>(id) {
  return { type: DELETE_<% TEMPLATE_NAME singular uppercase %>, id };
}