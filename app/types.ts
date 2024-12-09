export type FormData = {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
};

export type ValidFieldNames =
  | "name"
  | "email"
  | "assignment_description"
  | "github_repo_url"
  | "candidate_level";

export type RestLevelsResponse = {
  levels: string[];
};
