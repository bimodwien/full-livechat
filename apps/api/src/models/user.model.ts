export type TUser = {
  id: string;
  username: string;
  email: string;
  password?: string;
};

export type TDecode = {
  type: string;
  user: TUser;
};
