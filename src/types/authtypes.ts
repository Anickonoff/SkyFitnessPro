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
    courseProgress: CourseProgress[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export type WorkoutProgress = {
  _id: string;
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
};

export type CourseProgress = {
  _id: string;
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgress[];
};
