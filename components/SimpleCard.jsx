import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
export default function SimpleCard({ id, title, description }) {

    return (
        <Card className="singleCard" style={{ minWidth: '275px', marginBottom: '10px' }}>
            <CardContent>
                <Typography style={{ fontSize: '15px' }} color="textSecondary" >
                    {id}
                </Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}