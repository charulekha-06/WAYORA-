import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/*
          Disable body scrolling on web.
        */}
        <ScrollViewStyleReset />

        {/* Inject Ionicons font face natively to fix SSR icon flashing and Vercel routing issues */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Ionicons';
            src: url('/fonts/Ionicons.ttf?v=2') format('truetype');
          }
          @font-face {
            font-family: 'ionicons';
            src: url('/fonts/Ionicons.ttf?v=2') format('truetype');
          }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
