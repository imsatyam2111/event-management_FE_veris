import { useQuery } from '@apollo/client';
import { CircularProgress, Alert, AlertTitle } from '@mui/material';
import { GET_ALL_EVENTS } from '../graphql/queries';
import { Event as IEventType } from '../types';
import Event from './Event';

const Events = () => {
  const { data, error, loading } = useQuery(GET_ALL_EVENTS);

  if (loading) {
    return (
      <CircularProgress />
      // <div className="p-4 flex justify-center items-center">
      //   <span className="text-sm font-normal text-black/70">Loading...</span>
      // </div>
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
    <div className="flex flex-col space-y-4 px-2 py-4">
      {data?.getAllEvents?.map((event: IEventType) => (
        <Event key={event.id} {...event} />
      ))}
    </div>
  );
};

export default Events;
