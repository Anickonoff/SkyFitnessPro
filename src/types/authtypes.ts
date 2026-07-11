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

export type UserInfoResponse = {
  user: {
    _id: string;
    email: string;
    password: string;
    selectedCourses: string[];
    courseProgress: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
