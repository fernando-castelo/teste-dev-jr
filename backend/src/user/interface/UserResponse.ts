export interface UserResponse<User> {
  data: User;
  status: string;
}

export interface DeletedUserResponse {
  id: number;
  status: string;
}
