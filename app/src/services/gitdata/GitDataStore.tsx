import { createContext, useContext, useState } from "react";

interface ProviderProps {
    children: React.ReactNode;
}

export const GitDataStoreContext = createContext<any>({});

export const useGitDataStore = () => {
    return useContext(GitDataStoreContext);
}

export const GitDataProvider = (props: ProviderProps) => {
    const [folder, setFolder] = useState<string | undefined>(undefined);

    const value = {
        folder, setFolder
    };

    return (
        <GitDataStoreContext.Provider value={value}>{props.children}</GitDataStoreContext.Provider>
    );
}