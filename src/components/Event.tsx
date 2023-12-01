import { Event as EventType } from "../models";

const Event = (props: EventType) => {
  return (
    <div className="flex flex-col space-y-2 bg-gray-100 rounded-md p-2">
      <h1 className="text-base font-semibold text-black/80">{props?.name}</h1>
      <p className="text-sm font-normal text-black/70">{props?.description}</p>
      <span>{props?.date}</span>
      <span>{props?.time}</span>
      <span>{props?.duration}</span>
      <div className="flex flex-row items-center space-x-2">
        {props?.guests?.map((guest, i) => (
          <div
            key={i.toString() + "-" + guest}
            className="flex items-center rounded-full bg-gray-200 p-2"
          >
            <span className="text-sm font-normal text-black/80">{guest}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
