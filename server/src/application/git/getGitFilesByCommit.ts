import { useExecuteCommand } from "../common/executeCommand";

export const useGetGitFilesByCommit = () => {
    const { executeCommand } = useExecuteCommand();

    const getGitFilesByCommit = async (currentWorkingDirectory: string, commitHash: string) => {
        const result = await executeCommand(`git ls-tree -r ${commitHash}`, currentWorkingDirectory);
        return result?.trim();
    }
    return { getGitFilesByCommit };
}