export type TPerson = {
  id: string;
  name: string;
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
};

export type TMechanic = {
  services: TService[];
} & TPerson;
