'use strict'

import { actionTypes } from './constants'

const {
  ADD_<% TEMPLATE_TOKEN singular upperCase %>,
  UPDATE_<% TEMPLATE_TOKEN singular upperCase %>,
  DELETE_<% TEMPLATE_TOKEN singular upperCase %>,
} = actionTypes;

export function add<% TEMPLATE_TOKEN singular capitalize %>(params) {
  return { type: ADD_<% TEMPLATE_TOKEN singular upperCase %>, params};
}

export function update<% TEMPLATE_TOKEN singular capitalize %>(id, params) {
  return { type: UPDATE_<% TEMPLATE_TOKEN singular upperCase %>, id, params };
}

export function delete<% TEMPLATE_TOKEN singular capitalize %>(id) {
  return { type: DELETE_<% TEMPLATE_TOKEN singular upperCase %>, id };
}