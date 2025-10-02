import { useCallback } from "react";
import { RepositoryInfo } from "../../domain/repositories/entities/RepositoryInfo";

export const useGetDefaultGitRepo = () => {
    const getDefaultGitRepo = useCallback(async () => {
        const result = await fetch("/api/repo/default");
        if (result.ok) {
            return (await result.json()) as RepositoryInfo;
        }
    }, []);
    return { getDefaultGitRepo }
}