export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
  phone: string;
  website: string;
}