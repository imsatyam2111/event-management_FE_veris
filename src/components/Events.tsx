import { useQuery } from '@apollo/client';
import { CircularProgress, Alert, AlertTitle, Box } from '@mui/material';
import { GET_ALL_EVENTS } from '../graphql/queries';
import { Event as IEventType } from '../types';
import Event from './Event';

const Events = () => {
  const { data, error, loading } = useQuery(GET_ALL_EVENTS);

  if (loading) {
    return (
      <Box sx={{ display: "flex", p: 4, justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong. <strong>Please refresh page.</strong>
      </Alert>
    );
  }

  return (
    <Box>
      {data?.getAllEvents?.map((event: IEventType) => (
        <Event key={event.id} {...event} />
      ))}
    </Box>
  );
};

export default Events;
