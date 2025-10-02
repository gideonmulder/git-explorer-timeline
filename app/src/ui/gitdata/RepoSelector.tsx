import { useEffect } from "react";
import { useGetDefaultGitRepo } from "../../application/gitdata/getDefaultGitRepo";
import { useGitDataStorage } from "../../services/gitdata/storageAdapter"

export default function RepoSelector() {
    const { folder, setFolder } = useGitDataStorage();
    const { getDefaultGitRepo } = useGetDefaultGitRepo();

    useEffect(() => {
        const invoke = async() =>
        {
            //TODO: do you always want to load some repo?
            if(!folder)
            {
                const repositoryInfo = await getDefaultGitRepo();
                if(repositoryInfo?.currentRepoRootLocation)
                {
                    setFolder(() => repositoryInfo.currentRepoRootLocation);
                }
            }
        }
        invoke();
    }, [getDefaultGitRepo, folder]);

    return (
        <>
            {folder} 
            <button>{folder ? " or select another git repo (TODO)" : "Select a git repo (TODO)" }</button>
        </>
    )
}