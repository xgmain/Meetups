import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useMeetups } from "../../../lib/hooks/useMeetups";
import { Link, useNavigate, useParams } from "react-router";

export default function ActivityDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {meetup, isLoadingMeetup} = useMeetups(id);

    if (isLoadingMeetup) return <div>Loading meetup...</div>;

    if (!meetup) return <div>Activity not found</div>;

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component='img'
                src={`/images/categoryImages/${meetup.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{meetup.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{meetup.date}</Typography>
                <Typography variant="body1">{meetup.description}</Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/manage/${meetup.id}`} color="primary">Edit</Button>
                <Button onClick={() => navigate('/meetups')} color='inherit'>Cancel</Button>
            </CardActions>
        </Card>
    )
}