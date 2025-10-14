import { useEffect, useState } from "react";
import { useGitDataStorage, useGitNavigationStorage } from "../../services/gitdata/storageAdapter";
import { useLoadGitFiles } from "../../application/gitdata/loadGitFiles";
import { GitFile } from "../../domain/repositories/entities/gitFile";
import _ from "lodash";

export default function FileExplorer() {
    const { folder, allCommits, allGitFiles } = useGitDataStorage();
    const { selectedCommit } = useGitNavigationStorage();

    const { loadGitFiles } = useLoadGitFiles();

    //TODO: useState or store?
    const [currentFiles, setCurrentFiles] = useState<GitFile[]>();

    useEffect(() => {
        loadGitFiles();
    }, [folder, allCommits, loadGitFiles]);

    useEffect(() => {
        setCurrentFiles((oldCurrentFiles) => {
            let newCurrentFiles = oldCurrentFiles;
            if (allGitFiles.length > 0) {
                const currentCommitHash = selectedCommit?.hash ?? null;
                const lastCommit = allCommits.length > 0 ? allCommits[0] : null;
                if (currentCommitHash === null && lastCommit !== null) {
                    //load last commit
                    newCurrentFiles = allGitFiles.filter(x => x.relatedCommit === currentCommitHash || x.relatedCommit === lastCommit.hash);
                }
                else {
                    newCurrentFiles = allGitFiles.filter(x => x.relatedCommit === currentCommitHash);
                }
                newCurrentFiles = _.sortBy(newCurrentFiles, [x => x.path.indexOf("/") === -1, x => x.path]);
            }
            return newCurrentFiles;
        })
    }, [allGitFiles, selectedCommit]);

    return (
        <div className="git-explorer file-explorer">
            {currentFiles?.map(x =>
                <div>{x.path}</div>
            )}
        </div>
    );
}