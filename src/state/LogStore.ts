import { atom } from "nanostores";
import type { Log, Logs } from "src/types";

export const logs = atom<Logs>([]);

export const addLog = (newLog: Log) => {
  logs.set([...logs.get(), newLog]);
};

export const clearLogs = () => {
  logs.set([]);
};
