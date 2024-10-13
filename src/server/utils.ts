import { v4 as uuidv4 } from "uuid";
import { genSaltSync, hashSync } from "bcryptjs";

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

export const hashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};

export enum AthenticationType {
  None = "none",
  ApiKey = "apiKey",
  Token = "token",
}
