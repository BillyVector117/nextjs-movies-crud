import SimpleContainer from "../elements/SimpleContainer"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
function New() {
    const [form, setForm] = useState({ name: "", description: "" })
    const [message, setMessage] = useState([])
    const router = useRouter()
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        postData(form)
    }
    const postData = async (form) => {
        try {
            //  console.log(form)
            const res = await fetch('/api/movie', {
                method: 'POST',
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
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container">
            <SimpleContainer >
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

            </SimpleContainer>
        </div>
    )
}

export default New
