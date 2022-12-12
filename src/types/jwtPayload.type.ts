export type JwtPayload = {
  sub: number;
  login: string;
  is_active: boolean;
  is_creator: boolean;
};

export type JwtPayloadForCustomer = {
  sub: number;
  phone: string;
  email: string;
};
