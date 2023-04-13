export interface PutOrder {
  type: string;
  payload: {
    id: number;
    quantity: number;
  };
}
export interface DeleteOrder {
  type: string;
  payload: number;
}

export interface GetCoffee {
  type: string;
  payload: any;
}
