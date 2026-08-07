import { Grid } from "@mui/material";
import MeetupList from "./MeetupList";
import MeetupDetails from "../details/MeetupDetails";
import MeetupForm from "../form/MeetupForm";

type Props = {
    meetups: Meetup[]
    selectMeetup: (id: string) => void
    cancelSelect: () => void
    selectedMeetup?: Meetup
    openForm: (id: string) => void
    closeForm: () => void
    editMode: boolean
}

export default function MeetupDashboard({ meetups, selectMeetup, selectedMeetup, cancelSelect, openForm, closeForm, editMode }: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <MeetupList
                    meetups={meetups}
                    selectMeetup={selectMeetup}
                />
            </Grid>
            <Grid size={5}>
                {selectedMeetup && !editMode &&
                    <MeetupDetails
                        selectedMeetup={selectedMeetup}
                        cancelSelect={cancelSelect}
                        openForm={openForm}
                    />
                }
                {editMode &&
                    <MeetupForm
                        closeForm={closeForm}
                        meetup={selectedMeetup}
                    />
                }
            </Grid>
        </Grid>
    )
}