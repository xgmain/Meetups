import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";

type Props = {
    meetup: Meetup
}

export default function MeetupCard({ meetup }: Props) {
    const isOrganizer = false;
    const isGoing = false;
    const label = isOrganizer ? 'You are organizer' : 'You are going';
    const isCancelled = false;
    const color = isOrganizer ? 'secondary' : isGoing ? 'warning' : 'default';
    
    return (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <CardHeader
                    avatar={<Avatar sx={{ height: 80, width: 80 }} />}
                    title={meetup.title}
                    slotProps={{
                        title: {
                            fontWeight: 'bold',
                            fontSize: 20
                        }
                    }}
                    subheader={
                        <>
                            Organized by{' '}
                            <Link to={`/profiles/bob`}>Bob</Link>
                        </>
                    }
                />
                <Box display='flex' flexDirection='column' gap={2} mr={2}>
                    {(isOrganizer || isGoing) && <Chip label={label} color={color} sx={{ borderRadius: 2 }} />}
                    {isCancelled && <Chip label='Cancelled' color='error' sx={{ borderRadius: 2 }} />}
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <CardContent sx={{ p: 0 }}>
                <Box display="flex" alignItems="center" mb={2} px={2}>
                    <Box display='flex' flexGrow={0} alignItems='center'>
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography variant="body2" noWrap>
                            {formatDate(meetup.date)}
                        </Typography>
                    </Box>

                    <Place sx={{ ml: 3, mr: 1 }} />
                    <Typography variant="body2">{meetup.venue}</Typography>
                </Box>
                <Divider />
                <Box display='flex' gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
                    Attendees go here
                </Box>
            </CardContent>
            <CardContent sx={{ paddingBottom: 3 }}>
                <Typography variant="body2">
                    {meetup.description}
                </Typography>
                <Button
                    component={Link}
                    to={`/meetups/${meetup.id}`}
                    variant="contained"
                    color="primary"
                    sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
                >
                    View
                </Button>
            </CardContent>
        </Card>
    )
}