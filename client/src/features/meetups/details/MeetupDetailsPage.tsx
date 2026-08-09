import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useMeetups } from "../../../lib/hooks/useMeetups";
import MeetupDetailsChat from "./MeetupDetailsChat";
import MeetupDetailsHeader from "./MeetupDetailsHeader";
import MeetupDetailsInfo from "./MeetupDetailsInfo";
import MeetupDetailsSidebar from "./MeetupDetailsSidebar";

export default function MeetupDetailsPage() {
    const {id} = useParams();
    const {meetup, isLoadingMeetup} = useMeetups(id);

    if (isLoadingMeetup) return <div>Loading meetup...</div>;

    if (!meetup) return <div>Meetup not found</div>;

    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <MeetupDetailsHeader meetup={meetup}  />
                <MeetupDetailsInfo meetup={meetup}  />
                <MeetupDetailsChat />
            </Grid>
            <Grid size={4}>
                <MeetupDetailsSidebar />
            </Grid>
        </Grid>
    )
}