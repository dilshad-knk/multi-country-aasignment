export type Role = 'admin' | 'viewer';
export type Country = {
  code: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  country: string;
};

export type DataItem = {
  id: string;
  title: string;
  description: string;
  country: string;
  createdBy: string;
};