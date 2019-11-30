import axios from 'axios';

const MODULES_CACHE: { [slug: string]: any; } = { };

export function dynamicModuleResolver(slug: string = 'not-found') {
  if (MODULES_CACHE[slug]) {
    return () => MODULES_CACHE[slug];
  }

  return () => axios.get(`http://localhost:3500/api/v1/pages/${slug}`)
      .then(res => {
        const pageType = res.data;
        return import(`../pages/${pageType}/${pageType}.module`)
          .then(importedModule => {
            const keys = Object.keys(importedModule);
            const ngModule =  importedModule[keys[0]];

            MODULES_CACHE[slug] = ngModule;
            return ngModule;
          })
          .catch(() => {
            console.warn(`Lazy load of module '${pageType}' failed. Loading Not found...`);
            return importNotFound();
          });
      })
      .catch(() => importNotFound())
}

function importNotFound() {
  return import('../pages/not-found/not-found.module').then(m => m.NotFoundModule);
}
