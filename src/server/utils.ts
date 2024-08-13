import { v4 as uuidv4 } from "uuid";

export const orderBy = (
  movies: { id: string; name: string }[],
  order: string
): { id: string; name: string }[] => {
  return movies.sort((a, b) =>
    order === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
};

export const generateUniqueIdentifier = (): string => {
  return uuidv4();
};

export enum AthenticationType {
  None = 'none',
  ApiKey = 'apiKey',
  Token = 'token'
}
