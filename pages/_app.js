//configuraciones de todas las paginas
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/minty/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />;
		</Layout>
	);
}
export default MyApp;
