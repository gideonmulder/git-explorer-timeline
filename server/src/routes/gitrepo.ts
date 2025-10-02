import { Express } from "express";
import * as path from 'path';
import { useGetGitBranch } from "../application/git/getGitBranch";
import { useGetGitCurrentRepositoryRootLocation } from "../application/git/getGitCurrentRepositoryRootLocation";
import { RepositoryInfo } from "../../../app/src/domain/repositories/entities/RepositoryInfo";

export default function configureApiGitRepo(app: Express) {
    const { getGitBranch } = useGetGitBranch();
    const { getGitCurrentRepositoryRootLocation } = useGetGitCurrentRepositoryRootLocation();

    app.get('/api/repo/default', async (req, res) => {

        const currentWorkingDirectory = path.resolve();
        const currentRepoRootLocation = await getGitCurrentRepositoryRootLocation(currentWorkingDirectory);
        let gitBranch: string | null = null;
        if(currentRepoRootLocation)
        {
            gitBranch = await getGitBranch(currentRepoRootLocation) ?? null;
        }
        

        res.send({ currentRepoRootLocation: currentRepoRootLocation, gitBranch: gitBranch } as RepositoryInfo);
    });
}