export type TFormState = {
  name: string;
  description?: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  guests: string[];
};

export type Event = {
  id: string;
  name: string;
  description?: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  guests: string[];
};