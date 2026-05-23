import { atom } from "react-atomic-state";
import { Toast } from "./types";

export const toastsAtom = atom<Record<Toast["id"], Toast>>({});
