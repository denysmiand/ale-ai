export type FormData = {
  name: string;
  email: string;
  assignment: string;
  github: string;
  level: string;
};

export type ValidFieldNames =
  | "name"
  | "email"
  | "assignment"
  | "github"
  | "level";

export type RestLevelsResponse = {
  levels: string[];
};
