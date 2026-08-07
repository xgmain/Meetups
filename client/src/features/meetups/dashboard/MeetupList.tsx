import { Box } from "@mui/material";
import MeetupCard from "./MeetupCard";

type Props = {
    meetups: Meetup[]
    selectMeetup: (id: string) => void
}

export default function MeetupList({ meetups, selectMeetup }: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {meetups.map(meetup => (
                <MeetupCard
                    key={meetup.id}
                    meetup={meetup}
                    selectMeetup={selectMeetup}
                />
            ))}
        </Box>
    )
}