# csr-rsc-ssg-isr-ssr-ssrf

Ce repo peut servir de support pour présenter un ou plusieurs meetup(s). Le parcours est le suivant...
* "CSR" Client Side Rendering : React en tant que lib SPA standard
* "RSC" React Server Components : exécution de composants React _uniquement_ côté serveur
* "SSG" Static Site Generation : exécution de composants React pendant le _build_
* "ISR" Incremental Static Regeneration : re-génération de composants à la demande
* "SSR" Server Side Rendering : _pre-rendering_ côté serveur puis exécution (_hydration_) côté client
* "SSRF" Server Side Request Forgery : une faille de sécurité corrigée récemment dans Next.JS


Ce travail est basé principalement sur deux sources :
* [https://demystifying-rsc.vercel.app/](https://demystifying-rsc.vercel.app/)
* [https://www.assetnote.io/resources/research/digging-for-ssrf-in-nextjs-apps](https://www.assetnote.io/resources/research/digging-for-ssrf-in-nextjs-apps)

---

![mind map](./docs/rendering_mindmap.drawio.svg?raw=true)

## CSR Client Side Rendering

### `1-csr-load-data` vanilla react SPA loading data

![mind map CSR](./docs/rendering_mindmap_csr.drawio.svg?raw=true)

> [!IMPORTANT]
> CSR (Client-Side Rendering): React code is delivered to the browser, which generates content that is inserted into the DOM.

![client side rendering loading data](./docs/1-csr-load-data.drawio.png)

#### démo

```
cd 1-csr-load-data
npm start
```

![CSR load data gif](./docs/1-csr-load-data.gif?raw=true)

### `2-csr-router` vanilla react SPA routing

> [!IMPORTANT]
> After the page has been loaded for the first time, navigating to other pages on the same website uses JavaScript to re-render parts of the page without requiring a full page refresh.

#### démo

```
cd 2-csr-router
npm start
```

![client side rendering routing](./docs/2-csr-router.gif?raw=true)

## RSC React Server Components

### `3-rsc-load-data` React Server Components (Next.js impl) loading data

![mind map CSR](./docs/rendering_mindmap_rsc.drawio.svg?raw=true)

> [!IMPORTANT]
> React components which are written to run *only* on the server, rather than in the browser.

![React Server Components loading data](./docs/3-rsc-load-data.drawio.png)

#### démo

```
cd 3-rsc-load-data
npm run build
npm run start
```

![client side rendering routing](./docs/3-rsc-load-data.gif?raw=true)

### `4-rsc-router` React Server Components (Next.js impl) routing

![mind map CSR](./docs/rendering_mindmap_rsc_router.drawio.svg?raw=true)

> [!IMPORTANT]
> Components are executed *only on the server*. The default behavior is static rendering: components are executed at build time.

#### démo

```
cd 4-rsc-router
npm run build
npm run start
```

![React server components routing](./docs/4-rsc-router.gif?raw=true)

## `5-SSR` SSR Server Side Rendering

![mind map SSR](./docs/rendering_mindmap_ssr.drawio.svg?raw=true)

> [!IMPORTANT]
> SSR means prerendering client components on the server. React code runs at the time it is requested. The result may be cached for future requests.

Best practice: define `'use client';` components as far down the component tree as possible.

[https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree)

### Hydration

> [!IMPORTANT]
> "In React, “hydration” is how React “attaches” to existing HTML that was already rendered by React in a server environment. During hydration, React will attempt to attach event listeners to the existing markup and take over rendering the app on the client. In apps fully built with React, you will usually only hydrate one “root”, once at startup for your entire app."

[https://react.dev/reference/react-dom/client/hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)

[https://www.gatsbyjs.com/docs/conceptual/partial-hydration/](https://www.gatsbyjs.com/docs/conceptual/partial-hydration/)

### démo

```
cd 5-ssr
npm run build
npm run start
```

![SSR](./docs/5-ssr.gif?raw=true)

## `6-pages-router-ssg` (Next.js impl)

![mind map page router SSG](./docs/rendering_mindmap_page_router_ssg.drawio.svg?raw=true)

> [!IMPORTANT]
> SSG (Static Site Generation) using the pages router: React code is run when you build your application, and the generated output is static.

### démo

```
cd 6-pages-router-ssg
npm run build
npm run start
```

## `7-pages-router-isr` (Next.js impl) 

![mind map page router ISR](./docs/rendering_mindmap_page_router_isr.drawio.svg?raw=true)

> [!IMPORTANT]
> ISR (using pages router): "Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages."

### démo

```
cd 7-pages-router-isr
npm run build
npm run start
```

### Pourquoi ISR ?

> "the data could become stale at request time"

[https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation)

## Server actions

[https://react.dev/reference/rsc/server-actions](https://react.dev/reference/rsc/server-actions)

## SSRF (fixed in NextJS v14.1.1)

### Définition SSRF

...

### Pourquoi ?

* Si on a accès à un serveur vulnérable mais pas au serveur cible directement (DMZ, FireWall...)
* Si on veut exécuter des requêtes en masquant sa propre origine
* ...

### Démo `8-ssrf-14.1.0`

#### Contexte

![SSRF A](./docs/8-ssrf-14.1.0_A.drawio.svg?raw=true)

[https://www.assetnote.io/resources/research/digging-for-ssrf-in-nextjs-apps](https://www.assetnote.io/resources/research/digging-for-ssrf-in-nextjs-apps)

#### Objectif

![SSRF B, objectif](./docs/8-ssrf-14.1.0_B-objectif.drawio.svg?raw=true)

#### Conditions pour exploiter la [CVE-2024-34351](https://nvd.nist.gov/vuln/detail/CVE-2024-34351)

* Une application basée sur Next.JS en version inférieure à la `14.1.1`
* L'utilisation de la fonction [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect), avec un chemin absolu. Dans la démo, dans addTodo.js : `redirect(`/blog/${inputValue}`);`

#### Fonctionnement de la fonction [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)

Source : [https://www.assetnote.io/resources/research/digging-for-ssrf-in-nextjs-apps](https://www.assetnote.io/resources/research/digging-for-ssrf-in-nextjs-apps)

* La fonction Next.JS [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect) ne renvoie pas une réponse HTTP 302 au navigateur. 

Next.JS exécute la requête côté serveur, puis retourne le résultat au navigateur :
* Pour exécuter la requête, Next.JS doit construire l'URL à appeler. 
  Dans la démo, dans addTodo.js :
  La fonction `redirect('/blog/123');` construit l'URL `http://207.154.209.99/blog/123`.
  Pour construire cette URL, Next.JS récupère notamment le host `207.154.209.99` à partir du header HTTP de la requête initiale.
* Next.JS commence par requêter l'URL avec un HTTP HEAD.
* Si la réponse retourne un header `Content-Type: text/x-component`, alors Next.JS requête l'URL avec un HTTP GET. 

![SSRF C, intro](./docs/8-ssrf-14.1.0_C-intro.drawio.svg?raw=true)

#### Exploitation

Pour aboutir à un SSRF sur le serveur cible, il faut donc exécuter un autre serveur :
* qui écoute sur toutes les routes (query path)
* qui retourne un HTTP 200 avec un header `Content-Type: text/x-component`, pour toute requête HEAD
* qui retourne un HTTP 302 vers le serveur cible, pour toute requête GET

![SSRF D, exploit](./docs/8-ssrf-14.1.0_D-exploit.drawio.svg?raw=true)

![CSR load data gif](./docs/8-exploit-demo.gif?raw=true)

### Correction de la vulnérabilité dans `8-ssrf-14.1.0`

#### Solution 1 (non pérènne) : Configuration nginx pour forcer le host

Dans `/etc/nginx/sites-available/nextjs` 

Avant :
```
server {
  listen 80 default_server;
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Après :
```
server {
  listen 80;
  server_name 207.154.209.99;
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host 207.154.209.99;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Risque d'effet de bord...

[https://nginxtutorials.com/nginx-proxy_set_header-directive/](https://nginxtutorials.com/nginx-proxy_set_header-directive/)

#### Solution 2 : update Next.js

[https://github.com/vercel/next.js/security/advisories/GHSA-fr5h-rqp8-mj6g](https://github.com/vercel/next.js/security/advisories/GHSA-fr5h-rqp8-mj6g)

## Notes

### "Extra attributes from the server"

[https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c](https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c)

### "getStaticProps" is not supported in app/. Read more: https://nextjs.org/docs/app/building-your-application/data-fetching

[https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#static-site-generation-getstaticprops](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#static-site-generation-getstaticprops)

![create-next-app](./docs/3-ssg-create-next-app.png)

[https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-4-migrating-pages](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-4-migrating-pages)

> Pages in the app directory are Server Components by default. This is different from the pages directory where pages are Client Components.

> Upgrading to Next.js 13 does not require using the new App Router. You can continue using pages with new features that work in both directories

### Performances

Si on veut comparer les performances de chargement pour les différentes solutions, on peut ajouter les metriques web core vital en `console.log`.

[https://web.dev/articles/fcp?hl=fr](https://web.dev/articles/fcp?hl=fr)

## autres sources / références

[https://rsc-parser.vercel.app/](https://rsc-parser.vercel.app/)

[https://stackoverflow.com/questions/76325862/what-is-the-difference-between-react-server-components-rsc-and-server-side-ren](https://stackoverflow.com/questions/76325862/what-is-the-difference-between-react-server-components-rsc-and-server-side-ren)

[https://github.com/reactjs/server-components-demo?tab=readme-ov-file#should-i-use-this-demo-for-benchmarks](https://github.com/reactjs/server-components-demo?tab=readme-ov-file#should-i-use-this-demo-for-benchmarks)

[https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md#does-this-replace-ssr](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md#does-this-replace-ssr)

[https://www.youtube.com/watch?v=jEJEFAc8tSI](https://www.youtube.com/watch?v=jEJEFAc8tSI)

ISR using App router ?

[https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)

> In the Next.js App Router, all fetched data is now static by default, rendered at build time. However, this can be changed easily: Next.js extends the fetch options object to provide flexibility in caching and revalidating rules. You can use the {next: {revalidate: number}} option to refresh static data at set intervals or when backend changes occur (Incremental Static Regeneration), while the {cache: 'no-store'} option can be passed in the fetch request for dynamic data (server-side rendering).

[https://www.telerik.com/blogs/current-state-react-server-components-guide-perplexed](https://www.telerik.com/blogs/current-state-react-server-components-guide-perplexed)

[https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)

[https://github.com/reactjs/server-components-demo](https://github.com/reactjs/server-components-demo)

[https://dev.to/vteacher/let-s-make-a-web-application-with-react-server-components-5dmg](https://dev.to/vteacher/let-s-make-a-web-application-with-react-server-components-5dmg)

[https://react.dev/blog/2024/04/25/react-19](https://react.dev/blog/2024/04/25/react-19)

[https://react.dev/reference/rsc/server-components](https://react.dev/reference/rsc/server-components)

[https://www.youtube.com/watch?v=ePAPd9qzGyM](https://www.youtube.com/watch?v=ePAPd9qzGyM)

[https://www.joshwcomeau.com/react/server-components/](https://www.joshwcomeau.com/react/server-components/)

[https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies)

[https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

[https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)

[https://react.dev/reference/rsc/server-components#server-components-without-a-server](https://react.dev/reference/rsc/server-components#server-components-without-a-server)
