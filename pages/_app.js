//configuraciones de todas las paginas
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/pulse/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import "../styles/form.css";
import Layout from "../components/layout";
import { SSRProvider } from "react-bootstrap";

// function MyApp({ Component, pageProps }) {
// 	return (
// 		<SSRProvider>
// 			<Layout>
// 				<Component {...pageProps} />;
// 			</Layout>
// 		</SSRProvider>
// 	);
// }
// export default MyApp;

// import "../styles/global.css";
// import '../styles/globals.css'
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
  {/* <SSRProvider> */}
    <Layout>
      <Component {...pageProps} />
    </Layout>
  {/* </SSRProvider> */}
  </SWRConfig>;
}

export default MyApp
