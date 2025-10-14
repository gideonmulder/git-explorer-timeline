import { Commit } from "../../domain/repositories/entities/commit";
import { GitFile } from "../../domain/repositories/entities/gitFile";

export interface IGitDataStorageService {
    folder: string | undefined;
    setFolder: (folderSetter: (currentFolder: string | undefined) => string | undefined) => void;
    allCommits: Commit[];
    setAllCommits: (allCommitsSetter: (currentAllCommits: Commit[]) => Commit[]) => void;
    allGitFiles: GitFile[];
    setAllGitFiles: (allGitFilesSetter: (currentAllGitFiles: GitFile[]) => GitFile[]) => void;
}

export interface IGitNavigationService{
    selectedCommit: Commit | null;
    setSelectedCommit: (selectedCommitSetter: (currentSelectedCommit: Commit | null) => Commit | null) => void;    
}