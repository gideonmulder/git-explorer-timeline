import { useExecuteCommand } from "../common/executeCommand";

export const useGetGitCurrentRepositoryRootLocation = () => {
    const { executeCommand } = useExecuteCommand();

    const getGitCurrentRepositoryRootLocation = async (currentWorkingDirectory: string) => {
        const result = await executeCommand("git rev-parse --show-toplevel", currentWorkingDirectory);
        return result?.trim();
    }
    return { getGitCurrentRepositoryRootLocation };
}