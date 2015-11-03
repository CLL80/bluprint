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

Our starting structure is:

```
project
│   README.md
│   .bluprintconfig
│   package.json
│
└───app
    │   app.js
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

To generate a Todo component blueprint run `bluprint generate component Todo`.

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

Need a pod example...

## Template Variables

Right now only one template variable `TEMPLATE_TOKEN` is available.

### Mutations

Several string mutations are available to help format the template variables. These can be applied as additional arguments in the template variables.

- `capitalize`
- `camelize`
- `uppercase`
- `titleCase`
- `plural`
- `singular`