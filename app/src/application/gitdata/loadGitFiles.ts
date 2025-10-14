import { useCallback } from "react"
import { useInvokeGitCommand } from "./invokeGitCommand";
import _ from "lodash";
import { useGitDataStorage } from "../../services/gitdata/storageAdapter";
import { GitFile } from "../../domain/repositories/entities/gitFile";

export const useLoadGitFiles = () => {
    const { setAllGitFiles, allCommits } = useGitDataStorage();
    const { invokeGitCommand } = useInvokeGitCommand();

    const loadGitFiles = useCallback(async () => {
        const untrackedFiles = await invokeGitCommand(`ls-files --others --exclude-standard`);
        const untrackedFileLines = untrackedFiles.split("\n");
        let newAllGitFiles: GitFile[] = [];

        for (const untrackedFileLine of untrackedFileLines) {
            if (untrackedFileLine) {
                newAllGitFiles.push({
                    path: untrackedFileLine,
                    hash: null,
                    relatedCommit: null
                });
            }
        }

        if (allCommits.length > 0) {
            //TODO: now we load all, is that ok with big gits?
            for (const commit of allCommits) {
                const commitFiles = await invokeGitCommand(`ls-tree -r ${commit.hash}`);
                const commitFileLines = commitFiles.split("\n");

                for (const commitFileLine of commitFileLines) {
                    if (commitFileLine) {
                        const commitFileData = commitFileLine.split(" ");
                        if (commitFileData.length === 3) {
                            
                            const commitFileDataHashAndFile = commitFileData[2].split("\t");
                            if(commitFileDataHashAndFile.length === 2){

                                newAllGitFiles.push({
                                    path: commitFileDataHashAndFile[1],
                                    hash: commitFileDataHashAndFile[0],
                                    relatedCommit: commit.hash
                                });
                            }
                        }
                    }
                }
            }
        }
        setAllGitFiles(() => newAllGitFiles);
    }, [invokeGitCommand, allCommits]);
    return { loadGitFiles }
}