/**
 * interface for defining the properties of the User type
 * @type {User}
 */
export interface User {
  _id: string;
  first_name: string;
  last_name: string;

  username: string;
  phone_number: string;
  password: string;
}

export interface Item {
    _id: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    condition: string;
    userId: {
        _id: string;
        firstname: string;
        lastname: string;
    };
    location: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}


export interface Chat {
  _id: string;
  participants: string[]; // user IDs
  item: string; // item ID
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  chat: string; // chat ID
  sender: string; // user ID
  content: string;
  createdAt: string;
  updatedAt: string;
}

