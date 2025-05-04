export type EnrollRequestDTO = {
  student: { name: string; email: string };
  leader: { email: string };
  project: { name: string };
  timestamp: string;
};
