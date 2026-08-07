import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [meetups, setMeetups] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Meetup[]>('https://localhost:5001/api/meetups')
            .then(response => setMeetups(response.data))
  }, [])

  return (
    <>
      <Typography variant='h3'>Meetups</Typography>
      <List>
        {meetups.map((meetup) => (
          <ListItem key={meetup.id}>
            <ListItemText>{meetup.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>

  )
}

export default App
