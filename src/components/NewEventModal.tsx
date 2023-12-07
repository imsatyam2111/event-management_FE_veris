import { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { TFormState } from '../types';
import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../graphql/mutations';
import { GET_ALL_EVENTS } from '../graphql/queries';

interface INewEventModal {
  open: boolean;
  onClose: () => void;
}

type Guest = string;

const initialState = {
  name: '',
  description: '',
  date: '',
  time: '',
  duration: '',
  location: '',
  guests: [],
};

const NewEventModal = (props: INewEventModal) => {
  const { open, onClose } = props;
  const client = useApolloClient();
  const [createEvent] = useMutation(CREATE_EVENT, {
    refetchQueries: [GET_ALL_EVENTS],
  });

  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState('');
  const [formData, setFormData] = useState<TFormState>(initialState);

  const handleModalClose = () => {
    onClose();
    setFormData(initialState);
  };

  const handleAddGuest = () => {
    if (newGuest) {
      setGuests([...guests, newGuest]);
      setNewGuest('');
      setFormData({
        ...formData,
        guests: [...formData.guests, newGuest],
      });
    }
  };

  const handleNewGuestChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGuest(e.target.value);
  };

  const handleRemoveGuest = (guestToRemove: Guest) => {
    const newGuests = guests.filter((guest) => guest !== guestToRemove);
    setGuests(newGuests);
    setFormData({
      ...formData,
      guests: newGuests,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent({
        variables: {
          name: formData.name,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          guests: formData.guests,
          duration: formData.duration,
          description: formData.description,
        },
      });
      setFormData(initialState);
      setGuests([]);
      client.refetchQueries({
        include: [],
      });
      onClose();
    } catch (error) {
      console.log({ error });
      alert('something went wrong, please try again');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 600 } }}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">New Event</Typography>
          <IconButton size="small" onClick={handleModalClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ my: 2 }}>
        <Box component="form" noValidate autoComplete="off" sx={{ p: 2, pb: 0 }}>
          <Stack spacing={2}>
            <TextField
              size="small"
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              size="small"
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  name="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                  sx={{ textAlign: 'left !important' }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  name="time"
                  label="Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
                <TextField
                  fullWidth
                  size="small"
                  name="duration"
                  label="Duration"
                  placeholder="1h 30m"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Box>
            </Box>

            <TextField
              size="small"
              name="location"
              label="Location"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <TextField
                size="small"
                label="Add Guest"
                value={newGuest}
                onChange={handleNewGuestChange}
                variant="outlined"
                fullWidth
                sx={{ flex: 1 }}
              />
              <Button variant="outlined" onClick={handleAddGuest} startIcon={<Add />}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {guests.map((guest, index) => (
                <Chip key={index} label={guest} onDelete={() => handleRemoveGuest(guest)} variant="outlined" />
              ))}
            </Box>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" sx={{ backgroundColor: '#0766AD' }} onClick={handleSubmit}>
          Create Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewEventModal;
