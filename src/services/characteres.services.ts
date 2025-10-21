import api from "../api/api";
import { ICharacterResponse } from "../characteres.type";

export async function getCharacteres(page = 1): Promise<ICharacterResponse> {
  const res = await api.get<ICharacterResponse>(`/character/?page=${page}`);
  return res.data;
}
