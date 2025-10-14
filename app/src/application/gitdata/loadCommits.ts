import { useCallback } from "react"
import { useInvokeGitCommand } from "./invokeGitCommand";
import { Commit } from "../../domain/repositories/entities/commit";
import _ from "lodash";
import { useGitDataStorage } from "../../services/gitdata/storageAdapter";

export const useLoadCommits = () => {
    const { setAllCommits } = useGitDataStorage();
    const { invokeGitCommand } = useInvokeGitCommand();

    const loadCommits = useCallback(async () => {
        const logResult = await invokeGitCommand(`log`);
        if (logResult) {
            const lines = logResult.split("\n");
            let allCommits: Commit[] = [];
            let currentCommit: Commit | undefined = undefined;
            for (const line of lines) {
                const lineValue = line.trim();
                if (lineValue.indexOf("commit ") === 0) {
                    if (currentCommit) {
                        allCommits.push(_.cloneDeep(currentCommit));
                    }
                    currentCommit = {
                        author: "unknown",
                        date: new Date(),
                        description: "",
                        hash: lineValue.split(" ")[1]
                    };
                }
                else if (currentCommit && lineValue.indexOf("Author: ") === 0) {
                    const authorVal = lineValue.replace("Author:", "").trim();
                    currentCommit.author = authorVal;
                }
                else if (currentCommit && lineValue.indexOf("Date: ") === 0) {
                    const dateVal = lineValue.replace("Date:", "").trim();
                    currentCommit.date = new Date(dateVal);
                }
                else if (currentCommit && lineValue) {
                    //TODO: multiline commits?
                    currentCommit.description += lineValue;
                }
            }
            if (currentCommit) {
                allCommits.push(_.cloneDeep(currentCommit));
            }
            setAllCommits(() => allCommits);
        }
    }, [invokeGitCommand]);
    return { loadCommits }
}