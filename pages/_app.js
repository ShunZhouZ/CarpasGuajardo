//configuraciones de todas las paginas
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/minty/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import "../styles/form.css";
import Layout from "../components/layout";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
	return (
		<SSRProvider>
			<Layout>
				<Component {...pageProps} />;
			</Layout>
		</SSRProvider>
	);
}
export default MyApp;
