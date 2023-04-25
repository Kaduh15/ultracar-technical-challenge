export type TPerson = {
  id: string;
  name: string;
  role: 'client' | 'mechanic';
};

export type TClient = {
  car: string;
} & TPerson;

export type TPart = {
  id: string;
  name: string;
  price: number;
};

export type TService = {
  price: number;
  client: TClient;
  parts: TPart[];
  initialDate: string;
  finishDate?: string;
};

export type TMechanic = {
  services: TService[];
} & TPerson;
