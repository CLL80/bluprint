'use strict'

import <% TEMPLATE_TOKEN capitalize %>IndexContainer from 'pods/<% TEMPLATE_TOKEN %>/index/container'

export function <% TEMPLATE_TOKEN capitalize %>IndexRoute(options) {
  const { title, subTitle } = options;

  return {
    name: '<% TEMPLATE_TOKEN %>.index',
    title: title,
    subTitle: subTitle,
    component: <% TEMPLATE_TOKEN capitalize %>IndexContainer,
  }
}

import New<% TEMPLATE_TOKEN singular capitalize %>Container from 'pods/<% TEMPLATE_TOKEN %>/new/container'

export function New<% TEMPLATE_TOKEN singular capitalize %>Route() {
  return {
    name: '<% TEMPLATE_TOKEN %>.new',
    title: 'New <% TEMPLATE_TOKEN singular capitalize %>',
    subTitle: 'What needs doing?',
    component: New<% TEMPLATE_TOKEN singular capitalize %>Container
  }
}

import Edit<% TEMPLATE_TOKEN singular capitalize %>Container from 'pods/<% TEMPLATE_TOKEN %>/edit/container'

export function Edit<% TEMPLATE_TOKEN capitalize %>Route(options) {
  const { subTitle, passProps } = options;

  return {
    name: '<% TEMPLATE_TOKEN %>.edit',
    title: 'Edit <% TEMPLATE_TOKEN singular capitalize %>',
    subTitle:  subTitle,
    component: Edit<% TEMPLATE_TOKEN singular capitalize %>Container,
    passProps: { ...passProps }
  }
}