export type TPerson = {
  id: string;
  name: string;
  role: 'client' | 'mechanic';
};

export type TClient = {
  car: string;
} & TPerson;

export type TPart = {
  name: string;
  price: number;
};

export type TService = {
  price: number;
  client: TClient;
  parts: TPart[];
  initialDate: Date;
  finishDate?: Date;
};

export type TMechanic = {
  services: TService[];
} & TPerson;
