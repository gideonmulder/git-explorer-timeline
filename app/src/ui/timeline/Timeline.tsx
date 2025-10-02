import { useEffect } from "react";
import { useGitDataStorage } from "../../services/gitdata/storageAdapter";

export default function Timeline() {
    const { folder } = useGitDataStorage();

    useEffect(() => {
        //TODO: load timeline based on git log into storage
    }, [folder]);

    return (
        <div className="git-explorer timeline">
            Timelinethingy here
        </div>
    );
}