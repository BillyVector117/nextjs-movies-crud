import styles from "../styles/Home.module.css"
import { Button, Link } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import Footer from "../elements/Footer"
function ErrorPage({ success, error, movie }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Error | NextJS</title>
                <meta name="description" content="Getting single item by ID" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {error.toUpperCase()}
                </h1>

                <Link href="/">
                    <Button variant="outlined" color="primary" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        GO BACK
                    </Button>
                </Link>
            </main>
            <Footer/>

        </div>
    )
}

export default ErrorPage
