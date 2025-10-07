import { Express } from "express";
import * as path from 'path';
import { useGetGitBranch } from "../application/git/getGitBranch";
import { useGetGitCurrentRepositoryRootLocation } from "../application/git/getGitCurrentRepositoryRootLocation";
import { RepositoryInfo } from "../../../app/src/domain/repositories/entities/repositoryInfo";
import { useGetGitFilesByCommit } from "../application/git/getGitFilesByCommit";
import { useExecuteCommand } from "../application/common/executeCommand";

export default function configureApiGitRepo(app: Express) {
    const { getGitBranch } = useGetGitBranch();
    //TODO: should we do the git command thingies at the backend?
    //const { getGitFilesByCommit } = useGetGitFilesByCommit();
    const { executeCommand } = useExecuteCommand();
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

    app.get('/api/repo/invokegitcommand', async (req, res) => {
        //TODO: maybe this is too quick and dirty, fix later by making endpoints foreach git command
        const cwd : string | undefined = req.query.cwd?.toString();
        const command : string | undefined = req.query.command?.toString();

        if(cwd && command){
            const gitResponse = await executeCommand("git --no-pager " + command, cwd);
            res.send(gitResponse);
        }
        else{
            res.send(null);
        }
    });
}