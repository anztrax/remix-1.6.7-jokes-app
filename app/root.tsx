import React from 'react';
import type {
  MetaFunction,
  LinksFunction
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { RecoilRoot } from 'recoil';

import antdStylesUrl from './antd-style.css';
import tailwindcssUrl from './styles/tailwind.css';
import globalStylesUrl from './styles/global.css';
import globalMediumStylesUrl from './styles/global-medium.css';
import globalLargeStylesUrl from './styles/global-large.css';
import antdStyleUrl from 'antd/dist/antd.css';
import tailwindAntdStylesUrl from './tailwind-antd.css';

export const meta: MetaFunction = () => {
  const description = `Learn Remix and laugh at the same time!`;
  return {
    charset: "utf-8",
    description,
    title: "Remix,jokes",
    viewport: "width=device-width,initial-scale=1",
    "twitter:image": "https://remix-jokes.lol/social.png",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@remix_run",
    "twitter:site": "@remix_run",
    "twitter:title": "Remix Jokes",
    "twitter:description": description,
  };
};

export const links: LinksFunction = () => {
  return [
    // {
    //   rel: 'stylesheet',
    //   href: globalStylesUrl
    // },
    // {
    //   rel: 'stylesheet',
    //   href: globalMediumStylesUrl,
    //   media: "print, (min-width: 640px)",
    // },
    // {
    //   rel: "stylesheet",
    //   href: globalLargeStylesUrl,
    //   media: "screen and (min-width: 1024px)",
    // },
    {
      rel: 'stylesheet',
      href: antdStylesUrl,
      as: 'style'
    },
    // {
    //   rel: 'stylesheet',
    //   href: tailwindcssUrl
    // },
    // {
    //   rel: 'stylesheet',
    //   href: tailwindAntdStylesUrl
    // }
  ];
}

function Document({ children, title = `Remix: So great, it's funny!`}: {
  children: React.ReactNode,
  title?: string
}){
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <Document>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </Document>
    </RecoilRoot>
  );
}

export function CatchBoundary(){
  const caught = useCatch();

  return (
    <Document
      title={`${caught.status} ${caught.statusText}`}
    >
      <div className={'error-container'}>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: {error: Error}){
  console.error(error);

  return (
    <Document title={'Uh-oh!'}>
      <div className={'error-container'}>
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
