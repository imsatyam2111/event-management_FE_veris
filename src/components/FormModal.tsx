import React, { useState } from "react";
import { useMutation , useApolloClient } from "@apollo/client";
import { MdClose } from "react-icons/md";
import { CREATE_EVENT } from "../graphql/mutations";
import { TFormState } from "../models";
import { CustomInput, Guest } from ".";
import { GET_ALL_EVENTS } from "../graphql/queries";

interface IFormModal {
  isVisible: boolean;
  onClose: () => void;
}

const FormModal = ({ isVisible, onClose }: IFormModal) => {
    const client = useApolloClient();
    
    const [formState, setFormState] = useState<TFormState>({
    name: "",
    date: "",
    time: "",
    guest: "",
    guests: [],
    duration: "",
    description: "",
  });

  const [createEvent, {}] = useMutation(CREATE_EVENT, {
    refetchQueries: [GET_ALL_EVENTS],
  });

  const handleFormState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddGuests = () => {
    if (formState.guest === "") return;

    setFormState((prevFormState) => ({
      ...prevFormState,
      guests: prevFormState.guests.concat(prevFormState.guest),
    }));
    setFormState((prevFormState) => ({
      ...prevFormState,
      guest: "",
    }));
  };

  const handleRemoveGuest = (guest: string) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      guests: prevFormState.guests.filter((g) => g !== guest),
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createEvent({
        variables: {
          name: formState.name,
          date: formState.date,
          time: formState.time,
          guests: formState.guests,
          duration: formState.duration,
          description: formState.description,
        },
      });
      setFormState({
        name: "",
        date: "",
        time: "",
        guest: "",
        guests: [],
        duration: "",
        description: "",
      });
      client.refetchQueries({
        include: [],
      });
      onClose();
    } catch (error) {
      console.log({ error });
      alert("something went wrong, please try again");
    }
  };

  return isVisible ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="p-4 bg-gray-100 flex flex-col w-full space-y-4 lg:w-[50%] items-center rounded-md"
      >
        {/* HEADER */}
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-lg font-semibold text-black/90">Create Event</h1>
          <div className="flex bg-gray-200/70 h-6 w-6 justify-center items-center rounded-md" onClick={onClose}>
            <MdClose className="h-5 w-5 text-black/60 cursor-pointer" />
          </div>
        </div>

        {/* INPUT ITEM(s) */}
        <CustomInput
          title="Event name"
          inputElement={
            <input
              type="text"
              name="name"
              value={formState.name}
              placeholder="Enter event name"
              onChange={handleFormState}
              className="
                            bg-gray-200/80 w-full p-2 placeholder:text-black/40 text-black/80
                            text-sm font-normal rounded-md
                        "
            />
          }
        />
        <CustomInput
          title="Event description"
          inputElement={
            <input
              type="text"
              name="description"
              value={formState.description}
              onChange={handleFormState}
              placeholder="Enter event description"
              className="
                            bg-gray-200/80 w-full p-2 placeholder:text-black/40 text-black/80
                            text-sm font-normal rounded-md
                        "
            />
          }
        />
        <div className="flex flex-row justify-center w-full space-x-2">
          <CustomInput
            title="Date"
            inputElement={
              <input
                type="date"
                className="min-w-1/3 p-1 lg:w-full"
                name="date"
                value={formState.date}
                onChange={handleFormState}
              />
            }
          />
          <CustomInput
            title="Time"
            inputElement={
              <input
                type="time"
                className="min-w-1/3 p-1 lg:w-full"
                name="time"
                value={formState.time}
                onChange={handleFormState}
              />
            }
          />
          <CustomInput
            title="Duration"
            inputElement={
              <input
                type="number"
                className="w-full p-1"
                placeholder="in minutes"
                name="duration"
                value={formState.duration}
                onChange={handleFormState}
              />
            }
          />
        </div>

        <CustomInput
          title="Add guests"
          inputElement={
            <div className="flex flex-row w-full space-x-2">
              <input
                type="text"
                name="guest"
                className="w-full p-1"
                value={formState.guest}
                onChange={handleFormState}
                placeholder="Add guests here"
              />
              <button
                type="button"
                className="px-4 py-1 bg-blue-500 rounded-md font-normal text-sm text-white/80"
                onClick={handleAddGuests}
              >
                Add
              </button>
            </div>
          }
        />

        {formState.guests.length > 0 ? (
          <div className="flex flex-row items-center w-full overflow-x-auto space-x-2">
            {formState.guests.map((guest, i) => (
              <Guest
                key={i.toString() + guest.toLowerCase()}
                guest={guest}
                onDeleteGuest={handleRemoveGuest}
              />
            ))}
          </div>
        ) : null}

        <button
          type="submit"
          className="px-2 py-1 rounded-md bg-blue-500 text-base font-normal text-white/80"
        >
          Submit
        </button>
      </form>
    </div>
  ) : null;
};

export default FormModal;
