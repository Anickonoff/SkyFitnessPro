export type RegisterProps = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  message?: string;
};

export type UserInfoProps = {
  token: string;
};

export type UserInfoResponse = {
  email: string;
  selectedCourses: string[];
};
