import api from "../api/api";
import { getCharacteres } from "../services/characteres.services";

jest.mock("../src/api/rickAndMortyApi", () => {
  const original = jest.requireActual("../src/api/rickAndMortyApi");
  return {
    ...original,
    api: {
      get: jest.fn(),
    },
  };
});

describe("Mock function tests", () => {
  const mockCharacters = {
    info: {
      count: 2,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [
      { id: 1, name: "Rick", status: "Alive", species: "Human", image: "rick.png" },
      { id: 2, name: "Morty", status: "Alive", species: "Human", image: "morty.png" },
    ],
  };

  it("usa mockReturnValue()", async () => {
    (api.get as jest.Mock).mockReturnValue({ data: mockCharacters });

    const data = await getCharacteres();
    expect(data.results.length).toBe(2);
  });

  it("usa mockReturnValueOnce()", async () => {
    (api.get as jest.Mock).mockReturnValueOnce({ data: mockCharacters });

    const data = await getCharacteres();
    expect(data.info.count).toBe(2);
  });

  it("usa mockResolvedValue()", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockCharacters });

    const data = await getCharacteres();
    expect(data.results[0].name).toBe("Rick Sanchez");
  });

  it("usa mockResolvedValueOnce()", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockCharacters });

    const data = await getCharacteres();
    expect(data.results[1].name).toBe("Morty Smith");
  });

  it("usa mockRejectedValue()", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Erro genérico"));

    await expect(getCharacteres()).rejects.toThrow("Erro genérico");
  });

  it("usa mockRejectedValueOnce()", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Falha temporária"));

    await expect(getCharacteres()).rejects.toThrow("Falha temporária");
  });

  it("usa mockImplementation()", async () => {
    (api.get as jest.Mock).mockImplementation(async (url: string) => {
      return { data: mockCharacters };
    });

    const data = await getCharacteres();
    expect(data.info.pages).toBe(1);
  });

  it("usa mockImplementationOnce()", async () => {
    (api.get as jest.Mock).mockImplementationOnce(async () => {
      return { data: mockCharacters };
    });

    const data = await getCharacteres();
    expect(data.results[0].id).toBe(1);
  });
});
