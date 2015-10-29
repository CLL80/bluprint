'use strict'

import <% TEMPLATE_NAME capitalize %>IndexContainer from 'pods/<% TEMPLATE_NAME %>/index/container'

export function <% TEMPLATE_NAME capitalize %>IndexRoute(options) {
  const { title, subTitle } = options;

  return {
    name: '<% TEMPLATE_NAME %>.index',
    title: title,
    subTitle: subTitle,
    component: <% TEMPLATE_NAME capitalize %>IndexContainer,
  }
}

import New<% TEMPLATE_NAME singular capitalize %>Container from 'pods/<% TEMPLATE_NAME %>/new/container'

export function New<% TEMPLATE_NAME singular capitalize %>Route() {
  return {
    name: '<% TEMPLATE_NAME %>.new',
    title: 'New <% TEMPLATE_NAME singular capitalize %>',
    subTitle: 'What needs doing?',
    component: New<% TEMPLATE_NAME singular capitalize %>Container
  }
}

import Edit<% TEMPLATE_NAME singular capitalize %>Container from 'pods/<% TEMPLATE_NAME %>/edit/container'

export function Edit<% TEMPLATE_NAME capitalize %>Route(options) {
  const { subTitle, passProps } = options;

  return {
    name: '<% TEMPLATE_NAME %>.edit',
    title: 'Edit <% TEMPLATE_NAME singular capitalize %>',
    subTitle:  subTitle,
    component: Edit<% TEMPLATE_NAME singular capitalize %>Container,
    passProps: { ...passProps }
  }
}