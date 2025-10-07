import { useEffect } from "react";
import { useGitDataStorage } from "../../services/gitdata/storageAdapter";
import { useLoadCommits } from "../../application/gitdata/loadCommits";

export default function Timeline() {
    const { folder, allCommits } = useGitDataStorage();
    const { loadCommits } = useLoadCommits();

    useEffect(() => {
        //TODO: load timeline based on git log into storage
        loadCommits();
    }, [folder]);

    return (
        <div className="git-explorer timeline">
            Timelinethingy here {JSON.stringify(allCommits)}
        </div>
    );
}