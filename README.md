# **Simple Router**

![npm](https://img.shields.io/npm/v/@coheia/simple-router)
![npm bundle size](https://img.shields.io/bundlephobia/min/@coheia/simple-router?color=1bbfc1)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@coheia/simple-router?color=1bbfc1)
![npm](https://img.shields.io/npm/dt/@coheia/simple-router?color=6d9c29)

A router for Vanilla Single Page Application.

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

```typescript
import SimpleRouter from "@coheia/simple-router";

// The following imports are not provided by SimpleRouter:
import NotFound from "../pages/404/404"; // Component for page NotFound
import Home from "../pages/Home/Home"; // Component for page Home
import Contact from "../pages/Contact/Contact"; // Component for page Contact
import type { Page } from "./Page"; // The type of the component
import { render } from "./render"; // SPA Render Method

const renderMethod: SimpleRouter<Page>['render'] = async (route): Promise<void> => {
  const page = route ? route.component : new NotFound();
  const pageContent = await page.render();
  render(pageContent, '#router');
};

const router = new SimpleRouter<Page>(renderMethod);

router.addRoute('/', new Home());
router.addRoute('/contact', new Contact());

router.start();
```

### **Contributing**

Your contributions are always welcome! Submit a pull request with your changes or create an issue to discuss anything.

### **License**

This package is licensed under the MIT License.
