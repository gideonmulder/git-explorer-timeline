import { useCallback } from "react";
import { useGitDataStorage } from "../../services/gitdata/storageAdapter";

export const useInvokeGitCommand = () => {
    const { folder } = useGitDataStorage();

    const invokeGitCommand = useCallback(async (command: string) => {
        if (folder) {
            const result = await fetch(`/api/repo/invokegitcommand?cwd=${encodeURIComponent(folder)}&command=${encodeURIComponent(command)}`);
            if (result.ok) {
                //TODO: evil any
                return (await result.text()) as any;
            }
        }
        return null;
    }, [folder]);
    return { invokeGitCommand };
}