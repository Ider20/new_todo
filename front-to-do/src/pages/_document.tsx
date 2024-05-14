import { Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <html lang="en">
      <Head>
        <script
          src="https://kit.fontawesome.com/272037327f.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  );
}
