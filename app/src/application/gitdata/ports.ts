import { Commit } from "../../domain/repositories/entities/commit";

export interface IGitDataStorageService {
    folder: string | undefined;
    setFolder: (folderSetter: (currentFolder: string | undefined) => string | undefined) => void;
    allCommits: Commit[];
    setAllCommits: (allCommitsSetter: (currentAllCommits: Commit[]) => Commit[]) => void;
}