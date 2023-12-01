import { MdClose } from "react-icons/md";

interface Guest {
  guest: string;
  onDeleteGuest: (guest: string) => void;
}

const Guest = ({ guest, onDeleteGuest }: Guest) => {
  return (
    <div className="flex flex-row space-x-1 items-center rounded-full bg-gray-300 px-2 py-1">
      <MdClose
        className="h-4 w-4 text-black/60 cursor-pointer"
        onClick={() => onDeleteGuest(guest)}
      />
      <span className="text-sm font-normal text-black/80">{guest}</span>
    </div>
  );
};

export default Guest;
