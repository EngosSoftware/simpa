# simpa

Simple and lightweight library for prototyping Single Page Applications using TypeScript.

# Application

## index.ts

```
import './style.css';
import app from "./app/App";

function startApp() {
  app.doCreate();
  app.doRender();
  app.doInit();
}

startApp();

```
