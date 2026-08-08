import { Box, Typography } from "@mui/material";
import MeetupCard from "./MeetupCard";
import { useMeetups } from "../../../lib/hooks/useMeetups";
export default function MeetupList() {
    const {meetups, isPending} = useMeetups();

    if (!meetups || isPending) return <Typography>Loading...</Typography>
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {meetups.map(meetup => (
                <MeetupCard
                    key={meetup.id}
                    meetup={meetup}
                />
            ))}
        </Box>
    )
}