import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../graphql/queries";
import { Event as EventType } from "../models";
import Event from "./Event";

const Events = () => {
  const { data, error, loading } = useQuery(GET_ALL_EVENTS);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <span className="text-sm font-normal text-black/70">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <span className="text-sm font-normal text-black/70">
          Something went wrong. Please refresh page.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 px-2 py-4">
      {data?.getAllEvents?.map((event: EventType) => (
        <Event key={event.id} {...event} />
      ))}
    </div>
  );
};

export default Events;
