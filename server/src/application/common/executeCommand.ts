
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export const useExecuteCommand = () => {
    const executeCommand = async (command: string, workingDirectory: string) => {
        try {
            console.log(`try executing command ${command}`);
            const { stdout, stderr } = await execPromise(command, { cwd: workingDirectory });            
            console.log(stdout);
            console.error(stderr);
            return stdout;
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }
    return { executeCommand }
}
