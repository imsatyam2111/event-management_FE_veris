import { Paper, Stack, Typography, Chip } from '@mui/material';
import { Event as EventIcon, AccessTime, Place } from '@mui/icons-material';
import { Event as IEventType } from '../types';

const Event = (props: IEventType) => {
  const { name, description, guests, location, date, time, duration } = props;

  return (
    <Paper sx={{ backgroundColor: '#F2F2F2', p: 2, my: 2 }}>
      <Stack gap={1.5} sx={{ color: '#6E6D6D' }}>
        <Typography sx={{ fontSize: 24, color: '#080707' }}>{name}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Stack direction="row" gap={2}>
          <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
            <EventIcon fontSize="small" />
            <Typography variant="subtitle2">{date}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <AccessTime fontSize="small" />
            <Typography variant="subtitle2">{time}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Place sx={{ ml: -0.3 }} />
            <Typography variant="body2" component="span">
              {location}
            </Typography>
          </Stack>
          <Typography variant="body2">Duration: {duration}</Typography>
        </Stack>
        <Typography>Attendees:</Typography>
        <Stack direction="row" gap={2} sx={{ flexWrap: 'wrap' }}>
          {guests.map((guest, index) => (
            <Chip key={index} label={guest} variant="outlined" />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Event;
