import { generateUniqueIdentifier } from "./utils";

const movies = [
  { id: generateUniqueIdentifier(), name: "Blade Runner" },
  { id: generateUniqueIdentifier(), name: "2001: A Space Odyssey" },
  { id: generateUniqueIdentifier(), name: "The Matrix" },
  { id: generateUniqueIdentifier(), name: "Inception" },
  { id: generateUniqueIdentifier(), name: "Interstellar" },
];

export default movies;