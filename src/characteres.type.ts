interface IResult {
    id: number;
    name: string;
    status: string;
    type: string | null;
    gender: "Female" | "Male";
    origin: {
        name: string;
        url: string;
    },
    location: {
        name: string;
        url: string;
    },
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface ICharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  },
  results: IResult[]
}