import { IGitDataStorageService } from "../../application/gitdata/ports";
import { useGitDataStore } from "./GitDataStore";

export const useGitDataStorage = () : IGitDataStorageService => {
    return useGitDataStore();
}