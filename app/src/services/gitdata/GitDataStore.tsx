import { createContext, useContext, useState } from "react";
import { Commit } from "../../domain/repositories/entities/commit";
import { GitFile } from "../../domain/repositories/entities/gitFile";

interface ProviderProps {
    children: React.ReactNode;
}

export const GitDataStoreContext = createContext<any>({});

export const useGitDataStore = () => {
    return useContext(GitDataStoreContext);
}

export const GitDataProvider = (props: ProviderProps) => {
    const [folder, setFolder] = useState<string | undefined>(undefined);
    const [allCommits, setAllCommits] = useState<Commit[]>([]);
    const [allGitFiles, setAllGitFiles] = useState<GitFile[]>([]);


    const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);

    const value = {
        folder, setFolder,
        allCommits, setAllCommits,
        allGitFiles, setAllGitFiles,

        selectedCommit, setSelectedCommit
    };

    return (
        <GitDataStoreContext.Provider value={value}>{props.children}</GitDataStoreContext.Provider>
    );
}