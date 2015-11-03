# bluprint

CLI app for easily creating and placing boilerplate code from predefined blueprints.

## Installing

```bash
npm install bluprint -g
bluprint
```

## Development
Clone the repo.

```bash
npm install
npm link
npm run watch
```

To clear the dummy files

```bash
npm run clear
```

## Examples
For these examples our starting folder structure is:

```
project
│   README.md
│   .bluprintconfig
│   package.json
│
├───app
│   │   app.js
│
└───blueprints
    │   ...

```

Here's an application structure we want to blueprint and generate.

```
project
│   README.md
│   .bluprintconfig
│   package.json
│
└───app
    │   app.js
    │
    ├───components
    │   │   Todo.js
    │   │   List.js
    │
    └───actions
    │   todos.js
    │   filters.js
```


We will need to create two blueprints, one for components and one for actions. These will be placed in `project/blueprints/__blueprint__`.

Here's what a component blueprint for react might look like.

```js
// component blueprint
// project/blueprints/component.js

'use strict'

import {
  Component,
  PropTypes
} from 'react'

export default class <% TEMPLATE_TOKEN titleCase %> extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

<% TEMPLATE_TOKEN titleCase %>.propTypes = {

};
```

To generate a Todo component run `bluprint generate component Todo`.

Which will output

```js
// Todo component
// app/components/Todo.js

'use strict'

import {
  Component,
  PropTypes
} from 'react'

export default class Todo extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

Todo.propTypes = {

};
```

bluprint also allows generation of application structures utilizing pods. Here's an example strucuture we want to blueprint and generate.

```
project
│   README.md
│   .bluprintconfig
│   package.json
│
└───app
    │   app.js
    │
    ├───components
    │   │   List.js
    │
    └───pods
        │
        └───todos
            │
            ├───components
            │   │   Item.js
            │   │   Form.js
            │
            ├───index
            │   │   component.js
            │   │   container.js
            │
            │   constants.js
            │   actions.js
            │   reducers.js
            │   routes.js
```

To generate into a pods subdirectory you will need to set the directory in the config and then use the `--pod` flag.

The file structure for a `pod` blueprint looks like this:

```
app
│   README.md
│   .bluprintconfig
│   package.json
│
└───blueprints
    │
    └───pod
        │
        ├───components
        │   │
        │
        │   constants.js
        │   actions.js
        │   reducers.js
        │   routes.js
        │   config.json

```

Since `pod` will always be generated using the pods structure we define `"forcePods": true` in the bluprint config.

Before we can generate any of the compoents for the pod we will need to generate the pod. `bluprint generate pod todos`.

Using the component blueprint from before we generate the three types of components in this example.

- `bluprint generate component List`
- `bluprint generate component todos/index --pod`
- `bluprint generate component todos Item --pod`

## Template Variables

`TEMPLATE_TOKEN` is the only currently available template variable. I will add more as the need arises.

### Mutations

Several string mutations are available to help format the template variables. These can be applied as additional arguments in the template variables.

- `capitalize`
- `camelize`
- `uppercase`
- `titleCase`
- `plural`
- `singular`

## Config

Global and per blueprint config options are available. Here they are shown with their defaults.

### Global

```js
{
  "rootDirectory": "app",
  "podsDirectory": "pods", // Assumed as a sub directory of root
  "blueprintsDirectory": "blueprints"
}
```

### Blueprint

```js
{
  "forcePods": false
}
```