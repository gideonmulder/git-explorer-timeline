import { useGetDefaultGitRepo } from "../../application/gitdata/getDefaultGitRepo";
import { useGitDataStorage } from "../../services/gitdata/storageAdapter"

export default function RepoSelector() {
    const { folder, setFolder } = useGitDataStorage();
    const { getDefaultGitRepo } = useGetDefaultGitRepo();

    const loadDefaultGitRepo = async () => {
        const repositoryInfo = await getDefaultGitRepo();
        if (repositoryInfo?.currentRepoRootLocation) {
            setFolder(() => repositoryInfo.currentRepoRootLocation);
        }
    }

    if (folder) {
        return (
            <>
                <span>{folder}</span><span> or </span><button> select another git repo (TODO)</button>
            </>
        )
    }
    return (
        <>
            <button onClick={() => loadDefaultGitRepo()}>Load current repo</button><span> or </span><button>Select a git repo (TODO)</button>
        </>
    )
}