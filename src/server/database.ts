import { generateUniqueIdentifier } from "./utils";
import crypto from 'crypto';

export const movies = [
  { id: generateUniqueIdentifier(), name: "Blade Runner" },
  { id: generateUniqueIdentifier(), name: "2001: A Space Odyssey" },
  { id: generateUniqueIdentifier(), name: "The Matrix" },
  { id: generateUniqueIdentifier(), name: "Inception" },
  { id: generateUniqueIdentifier(), name: "Interstellar" },
];

export const SECRET_KEY = crypto.randomBytes(64).toString('hex');
