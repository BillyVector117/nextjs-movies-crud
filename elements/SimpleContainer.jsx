import React from 'react'
import Container from '@material-ui/core/Container';

export default function SimpleContainer({ children }) {
    return (
        <React.Fragment>
            <Container maxWidth="lg" style={{ backgroundColor: '#cfe8fc', height: '100vh', width: '100vw', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                {children}
            </Container >
        </React.Fragment>
    );
}
