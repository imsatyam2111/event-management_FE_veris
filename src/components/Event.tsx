import { BsCalendarDate } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { Event as EventType } from "../models";

const Event = (props: EventType) => {
  return (
    <div className="flex flex-col space-y-3 bg-gray-100 rounded-md p-4">
      <h1 className="text-lg font-semibold text-black/80">{props?.name}</h1>
      <p className="text-sm font-normal text-black/70">{props?.description}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-1">
          <BsCalendarDate className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-normal text-gray-600">
            {props?.date}
          </span>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <MdAccessTime className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-normal text-gray-600">
            {props?.time}
          </span>
        </div>
      </div>
      <span className="text-sm font-normal text-gray-600">
        Event duration: {Math.floor(Number(props?.duration) / 60)} hrs
      </span>
      <div className="flex flex-row items-center space-x-2">
        {props?.guests?.map((guest, i) => (
          <div
            key={i.toString() + "-" + guest}
            className="flex items-center rounded-full bg-gray-200 px-2 py-1"
          >
            <span className="text-sm font-normal text-gray-600">{guest}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
