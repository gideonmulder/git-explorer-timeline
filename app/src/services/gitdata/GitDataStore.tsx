import { createContext, useContext, useState } from "react";
import { Commit } from "../../domain/repositories/entities/commit";

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

    const value = {
        folder, setFolder,
        allCommits, setAllCommits
    };

    return (
        <GitDataStoreContext.Provider value={value}>{props.children}</GitDataStoreContext.Provider>
    );
}