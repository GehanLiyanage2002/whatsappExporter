export type Message = {
  id: string;
  date: string;
  time: string;
  sender: string;
  text: string;
  isSystem: boolean;
};

export type ChatData = {
  messages: Message[];
  participants: string[];
  dates: string[];
};
