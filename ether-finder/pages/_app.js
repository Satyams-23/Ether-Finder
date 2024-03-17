import '../styles/globals.css';
import Head from 'next/head'
import Navbar from '@/components/Navbar';


function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <title>Ether-Finder</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />;
    </>
}

export default MyApp;
