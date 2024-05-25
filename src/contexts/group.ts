import { createContext } from "react";

export interface GroupContextInterface {
  allGroups?: Group[],
  setAllGroups: React.Dispatch<React.SetStateAction<Group[] | undefined>>,
  group?: Group | null,
  setGroup: React.Dispatch<React.SetStateAction<Group | undefined | null>>
}


export const GroupContext = createContext<GroupContextInterface | null>(null);