import CompareTool from "../compare/CompareTool";
import FileExplorer from "../explorer/FileExplorer";
import Timeline from "../timeline/Timeline";
import "./Home.css";

export default function Home() {
    return (
        <>
            <button>Select a git repo</button>
            <Timeline />
            <FileExplorer />
            <CompareTool />
        </>
    )
};