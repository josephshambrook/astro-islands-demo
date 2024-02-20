import type { PromptContentType } from "src/types";

export const contentTypes: PromptContentType[] = [
  {
    key: "song",
    text: "Song",
  },
  {
    key: "poem",
    text: "Poem",
  },
  {
    key: "film-plot",
    text: "Film plot",
  },
  {
    key: "book-idea",
    text: "Book idea",
  },
];

export const createPrompt = (contentType: PromptContentType["key"]) => {
  const songTitleExplanation =
    "The following songs are separated as the song title, followed by a dash, followed by the artist:";

  if (contentType === "book-idea") {
    return `You are an author of thriller books, and you creating a new book. Create a short story with a cliffhanger ending, using the following songs as inspiration. ${songTitleExplanation}`;
  }

  if (contentType === "film-plot") {
    return `You are a screenwriter working for a top movie studio, and are creating the treatment for a new comedy starring Jim Carrey. Create a short synopsis for the film, using the following songs as inspiration. ${songTitleExplanation}`;
  }

  if (contentType === "poem") {
    return `You are an author of romantic poems, and are creating a new poem about two lovers based in Edinburgh. Create a short poem, using the following songs as inspiration. ${songTitleExplanation}`;
  }

  if (contentType === "song") {
    return `You are the writer of Punk Rock songs, inspired by acts like Green Day. Create and provide some song lyrics for a new hit punk rock single, using the following songs as inspiration. ${songTitleExplanation}`;
  }

  return "";
};

export const getContentTypeByKey = (contentTypeKey: PromptContentType["key"]) =>
  contentTypes.find((ct) => ct.key === contentTypeKey);
