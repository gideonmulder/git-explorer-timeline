import { IGitDataStorageService, IGitNavigationService } from "../../application/gitdata/ports";
import { useGitDataStore } from "./GitDataStore";

export const useGitDataStorage = () : IGitDataStorageService => {
    return useGitDataStore();
}

export const useGitNavigationStorage = () : IGitNavigationService => {
    return useGitDataStore();
}