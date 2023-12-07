import { useState } from 'react';
import { Events, NewEventModal } from '../components';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

function Home() {
  const [newEventModalOpen, setNewEVentModalOpen] = useState(false);

  const openNewEventModal = () => {
    setNewEVentModalOpen(true);
  };

  const closeNewEventModal = () => {
    setNewEVentModalOpen(false);
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: '24px 20%'} }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h4">My Events</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={openNewEventModal}>
            New Event
          </Button>
        </Stack>
        <Typography variant="h6" sx={{ my: 2 }}>Upcoming Events</Typography>
        <Events />
        <NewEventModal open={newEventModalOpen} onClose={closeNewEventModal} />
      </Box>
    </>
  );
}

export default Home;
