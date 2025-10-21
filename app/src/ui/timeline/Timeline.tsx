import { useEffect, useRef, useState } from "react";
import { useGitDataStorage, useGitNavigationStorage } from "../../services/gitdata/storageAdapter";
import { useLoadCommits } from "../../application/gitdata/loadCommits";
import "./Timeline.css";
import * as d3 from 'd3';
import D3XAxis from "../common/graphs/D3XAxis";
import { Commit } from "../../domain/repositories/entities/commit";
import D3Dots from "../common/graphs/D3Dots";

export default function Timeline() {
    const { folder, allCommits } = useGitDataStorage();
    const { setSelectedCommit, selectedCommit } = useGitNavigationStorage();
    const { loadCommits } = useLoadCommits();

    const [slideVal, setSlideVal] = useState<number>(1);

    const elemSvg = useRef<SVGSVGElement>(null);
    //TODO: logic to make size based on screen and resize logic
    const graphWidth = 700;
    const graphHeight = 50;
    const graphPadding = 20;

    const getLineXProp = (d: Commit) => {
        if (!d) {
            return new Date();
        }
        return new Date(d.date);
    }

    const getX = () => {
        let newX = d3.scaleTime().rangeRound([graphPadding, graphWidth - graphPadding]);
        newX.domain(d3.extent(allCommits, (d, i, a) => getLineXProp(d)) as [Date, Date]);
        return newX;
    }

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
                ) ? "commit selected" : "commit"}
                    onClick={() => setSelectedCommit(() => null)}
                >
                    <span>  </span>
                    <span> Now </span>
                    <span>  </span>
                </div>
                :
                <span></span>}


            {allCommits.map((x, index) =>
                <div key={x.hash} className={(
                    x.hash === selectedCommit?.hash
                ) ? "commit selected" : "commit"}
                    onClick={() => setSelectedCommit(() => x)}
                >
                    <span> {x.author} </span>
                    <span> {x.description} </span>
                    <span> {x.date.toISOString()} </span>
                </div>
            )}

            <svg width={graphWidth} height={graphHeight} style={{ maxWidth: "100%", scale: 0.5 }} ref={elemSvg} viewBox={"0 0 " + graphWidth + " " + graphHeight}>
                <D3XAxis data={allCommits} getX={getX} graphPadding={graphPadding} graphHeight={graphHeight} />
                <D3Dots data={allCommits} getX={getX} getLineXProp={getLineXProp} />
            </svg>
            <input type="range" min="1" max="100" value={slideVal} onChange={(e) => setSlideVal(parseInt(e.target.value, 10))} style={{"width":"700px"}} />
        </div>
    );
}