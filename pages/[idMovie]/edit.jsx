import styles from "../../styles/Home.module.css"
import { Button } from '@material-ui/core'
import Head from 'next/head'
import Footer from "../../elements/Footer"
import TextField from '@material-ui/core/TextField';
import Link from 'next/link'
import Movie from "../../models/Movie"
import dbConnect from "../../lib/dbConnect"
import ErrorPage from "../../components/ErrorPage"
import { useState } from "react";
import { useRouter } from "next/dist/client/router";

function edit({ success, error, movie }) {
    const router = useRouter()
    const [form, setForm] = useState({ name: movie.name, description: movie.description })
    const [message, setMessage] = useState([])

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        putData(form)
    }
    const putData = async (form) => {
        try {
            //  console.log(form)
            const res = await fetch(`/api/movie/${movie._id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            console.log(data)
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage((oldMessage) => [
                        ...oldMessage, { message: error.message }
                    ])
                }
            } else {
                router.push(`/${movie._id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log({ success, error, movie })

    if (!success) {
        return (
            <ErrorPage success={success} movie={movie} error={error} />
        )
    }
    return (
        <div className={styles.container}>
            <Head>
                <title> Update movie | NextJS</title>
                <meta name="Edit single movie" content="Form to edit a single movie" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>

                <h1 className={styles.title}>
                    UPDATE MOVIE
                </h1>

                <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <TextField onChange={handleChange} value={form.name} required name="name" id="name" label="name" placeholder="Movie..." style={{ marginBottom: '20px' }} />
                    <TextField onChange={handleChange} value={form.description} required name="description" id="description" label="description" placeholder="Movie description..." />
                    <Button type="submit" variant="outlined" color="primary" style={{ marginTop: '20px' }}>
                        Accept
                    </Button>
                    <Link href="/">
                        <span style={{ cursor: 'pointer' }}>Go back</span>
                    </Link>
                    {message.map(({ message }) => (
                        <p key={message}>{message} </p>
                    ))
                    }
                </form>
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

export default edit
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