import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

// enable prod for faster renders
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
  disableDebugTools();
}

// import common styles
import './shared/styles/styles.scss';

// import app module
import { AppModule } from './app';

export function main() {
   platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}



