//configuraciones de todas las paginas
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import "../styles/form.css";
import Layout from "../components/layout";
import { SSRProvider } from "react-bootstrap";

import { SWRConfig } from "swr";
import fetch from "../lib/fetchJson";

function MyApp({ Component, pageProps }) {
  return <SWRConfig
    value={{
      fetcher: fetch,
      onError: (err) => {
        console.error(err);
      },
    }}
  >
  <SSRProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SSRProvider>
  </SWRConfig>;
}

export default MyApp
