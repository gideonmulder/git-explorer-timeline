import { GitDataProvider } from "../../services/gitdata/GitDataStore";
import CompareTool from "../compare/CompareTool";
import FileExplorer from "../explorer/FileExplorer";
import Timeline from "../timeline/Timeline";
import "./Home.css";
import RepoSelector from "../gitdata/RepoSelector";

export default function Home() {

    return (
        <>
            <RepoSelector />
            <Timeline />
            <FileExplorer />
            <CompareTool />
        </>
    )
};