import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { useMeetups } from "../../../lib/hooks/useMeetups";
import { Link } from "react-router";

type Props = {
    meetup: Meetup
}

export default function MeetupCard({ meetup }: Props) {
    const { deleteMeetup } = useMeetups();
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {meetup.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                    {meetup.date}
                </Typography>
                <Typography variant="body2">
                    {meetup.description}
                </Typography>
                <Typography variant="subtitle1">
                    {meetup.city} / {meetup.venue}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 2 }}>
                <Chip label={meetup.category} variant="outlined" />
                <Box display='flex' gap={3}>
                    <Button
                        loading={deleteMeetup.isPending}
                        onClick={() => deleteMeetup.mutate(meetup.id)}
                        variant="contained" color="error" size="medium"
                    >
                        Delete
                    </Button>
                    <Button component={Link} to={`/meetups/${meetup.id}`} variant="contained" size="medium">View</Button>
                </Box>
            </CardActions>
        </Card>
    )
}