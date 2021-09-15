import dbConnect from "../../lib/dbConnect"
import Movie from "../../models/Movie"
import styles from "../../styles/Home.module.css"
import { Button, Link } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import ErrorPage from "../../components/ErrorPage"
import Footer from "../../elements/Footer"

function index({ success, error, movie }) {
    console.log("frontend messages", "success: ", success, "Error: ", error, "Movie: ", movie)
    if (!success) {
        console.log("No success")
        return (
            <ErrorPage error={error} success={success} movie={movie} />
        )
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>{movie.name} </title>
                <meta name="description" content="Getting single movie by ID" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div style={{ position: 'relative' }}>

                    <h1 className={styles.title}>
                        {movie.name}
                    </h1>
                    <Link href={`/${movie._id}/edit`} style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="primary" style={{
                            marginTop: '20px',
                            marginBottom: '20px',
                            position: 'absolute',
                            right: '-35%',
                            top: '2px'
                        }}>
                            EDIT
                        </Button>
                    </Link>
                    <Button variant="outlined" color="secondary" style={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        position: 'absolute',
                        right: '-35%',
                        top: '295px'
                    }}>
                        DELETE THIS MOVIE
                    </Button>
                </div>
                <p className={styles.description}>
                    {movie.description}
                </p>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="primary" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        GO BACK
                    </Button>
                </Link>

            </main>

            <Footer />

        </div>
    )

}

export default index

export async function getServerSideProps({ params }) {
    // { params } is a default prop from getServerSideProps()
    try {
        await dbConnect()
        console.log("Successfully connected!")
        const movie = await Movie.findById(params.idMovie).lean();
        if (!movie) {
            return { props: { success: false, error: "Movie not found" } }
        }
        // Serialize movie._id to string
        movie._id = `${movie._id}`
        console.log('Backend messages: ', movie)
        return { props: { success: true, movie } }
    } catch (error) {
        console.log('Backend messages: ', error)
        // Received ID is not and ObjectID type (mongoDB)
        if (error.kind === "ObjectId") {
            return { props: { success: false, error: "Invalid ID" } }
        }
        return { props: { success: false, error: "Error while getting data" } }
    }
}