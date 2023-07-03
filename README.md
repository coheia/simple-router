# **Simple Router**

![npm](https://img.shields.io/npm/v/@coheia/simple-router)
![npm bundle size](https://img.shields.io/bundlephobia/min/@coheia/simple-router?color=1bbfc1)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@coheia/simple-router?color=1bbfc1)
![npm](https://img.shields.io/npm/dt/@coheia/simple-router?color=6d9c29)

A simple router for handling routing in a Single Page Application (SPA).

## Table of Contents

- [Installation](#installation)
- [Import](#import)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

### **Installation**

```console
$ npm install @coheia/simple-router
```

### **Import**

Import the SimpleRouter class and its related types as follow:

```typescript
import SimpleRouter from "@coheia/simple-router";
```

### **Usage**

Implement the render method in your subclass to connect with your SPA render function:

⚠️ **Attention**: In the original `SimpleRouter` class, the `render` method is not implemented. To ensure the proper functioning of the class, you need to extend `SimpleRouter` and override the `render` method with the rendering pattern specific to your SPA.

```typescript
import SimpleRouter from "@coheia/simple-router";
import type { Route } from "@coheia/simple-router";

import NotFound from "../pages/404/404"; // Component for page NotFound, not provided by SimpleRouter
import type { Page } from "./Page"; // The type of the component, not provided by SimpleRouter
import { render } from "./render"; // SPA Render Method, not provided by SimpleRouter

/**
 * Router implementation that extends SimpleRouter
 * and override the render method.
 */
export class Router extends SimpleRouter<Page> {
  /**
   * Renders the specified route.
   * @param {Route<Page> | undefined} matchingRoute - The route to render.
   * Overrides the render method from SimpleRouter.
   */
  public override render(matchingRoute: Route<Page> | undefined): void {
    if (matchingRoute != null) {
      const { component } = matchingRoute;
      render(component.getTemplate(), "#router");
    } else {
      render(new NotFound().getTemplate(), "#router");
    }
  }
}
```

### **Contributing**

Your contributions are always welcome! Submit a pull request with your changes or create an issue to discuss anything.

### **License**

This package is licensed under the MIT License.
