/**
 * interface for defining the properties of the User type
 * @type {User}
 */
export interface User {
  _id: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;

  username: string | undefined;
  phone_number: string | undefined;
  password: string | undefined;
}

export interface Item {
    _id?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    images?: string[] | undefined;
    price?: number;
    category?: string | undefined;
    condition?: string | undefined;
    userId?: {
        _id: string | undefined;
        firstname: string | undefined;
        lastname: string | undefined;
    };
    location?: string | undefined;
    status?: string | undefined;
    createdAt?: string;
    updatedAt?: string;
}


export interface Chat {
  _id: string | undefined;
  participants: string[]; // user IDs
  item: any | undefined; // item ID
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string | undefined;
  chat: string | undefined; 
  sender: string | undefined; 
  content: string | undefined;
  createdAt: string;
  updatedAt: string;
}

