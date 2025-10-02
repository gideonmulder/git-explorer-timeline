import { useExecuteCommand } from "../common/executeCommand";

export const useGetGitBranch = () => {
    const { executeCommand } = useExecuteCommand();

    const getGitBranch = async (currentWorkingDirectory: string) => {
        const result = await executeCommand("git branch", currentWorkingDirectory);
        return result?.trim();
    }
    return { getGitBranch };
}