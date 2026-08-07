import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useMeetups } from "../../../lib/hooks/useMeetups";

type Props = {
    selectedMeetup: Meetup
    cancelSelect: () => void
    openForm: (id: string) => void
}

export default function MeetupDetails({ selectedMeetup, cancelSelect, openForm }: Props) {
    const { meetups } = useMeetups();
    const meetup = meetups?.find(x => x.id === selectedMeetup.id);

    if (!meetup) return <Typography>Loading...</Typography>

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
                <Button onClick={() => openForm(meetup.id)} color="primary">Edit</Button>
                <Button onClick={cancelSelect} color='inherit'>Cancel</Button>
            </CardActions>
        </Card>
    )
}