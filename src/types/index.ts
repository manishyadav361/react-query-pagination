export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
    title: string;
  };
  image: string;
}

export interface ApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
