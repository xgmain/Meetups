import { Box, Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import MeetupDashboard from "../../features/meetups/dashboard/MeetupDashboard";
import { useMeetups } from "../../lib/hooks/useMeetups";

function App() {
  const [selectedMeetup, setSelectedMeetup] = useState<Meetup | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { meetups } = useMeetups();

  const handleSelectMeetup = (id: string) => {
    setSelectedMeetup(meetups.find(x => x.id === id));
  }

  const handleCancelSelect = () => {
    setSelectedMeetup(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectMeetup(id);
    else handleCancelSelect();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  return (
     <Box sx={{ bgcolor: '#eeeeee' }}>
          <CssBaseline />
          <NavBar openForm={handleOpenForm} />
          <Container maxWidth='xl' sx={{ mt: 3 }}>
              <MeetupDashboard
                  meetups={meetups}
                  selectedMeetup={selectedMeetup}
                  selectMeetup={handleSelectMeetup}
                  cancelSelect={handleCancelSelect}
                  editMode={editMode}
                  openForm={handleOpenForm}
                  closeForm={handleFormClose}
              />
          </Container>

      </Box>

  )
}

export default App
