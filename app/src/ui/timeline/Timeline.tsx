import { useEffect } from "react";
import { useGitDataStorage, useGitNavigationStorage } from "../../services/gitdata/storageAdapter";
import { useLoadCommits } from "../../application/gitdata/loadCommits";
import "./Timeline.css";

export default function Timeline() {
    const { folder, allCommits } = useGitDataStorage();
    const { setSelectedCommit, selectedCommit } = useGitNavigationStorage();
    const { loadCommits } = useLoadCommits();

    useEffect(() => {
        loadCommits();
        //select latest
        setSelectedCommit(() => null);
    }, [folder]);

    return (
        <div className="git-explorer timeline">
            {allCommits.length > 0 ?
            <div className={(
                    (selectedCommit === null)
                     ) ? "commit selected": "commit"}
                     onClick={() => setSelectedCommit(() => null)}
                     >
                    <span>  </span>
                    <span> Now </span>
                    <span>  </span>
                </div>:
            <span></span>}
            {allCommits.map((x, index) => 
                <div className={(
                     x.hash === selectedCommit?.hash
                     ) ? "commit selected": "commit"}
                     onClick={() => setSelectedCommit(() => x)}
                     >
                    <span> {x.author} </span>
                    <span> {x.description} </span>
                    <span> {x.date.toISOString()} </span>
                </div>
            )}            
        </div>
    );
}