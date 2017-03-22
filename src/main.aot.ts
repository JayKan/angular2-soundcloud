import { platformBrowser } from '@angular/platform-browser';
import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModuleNgFactory } from 'build/src/app/index.ngfactory';

// enable prod for faster renders
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
  disableDebugTools();
}

// common app styles
import './shared/styles/styles.scss';

export function main() {
  platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.error(err));
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}



