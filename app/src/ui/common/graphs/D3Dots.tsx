import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

//TODO: this is not generic enough with the data-key and data-price thingies

interface ID3DotsProps {
    data: any[],
    getX: () => d3.ScaleTime<number, number, never>,
    getLineXProp: (d: any) => any
}

export default function D3Dots({ data, getX, getLineXProp }: ID3DotsProps) {
    const elemDotsGraphic = React.useRef<SVGGElement>(null);

    const getLine = (x: (a: any) => number): any => {
        const line = d3
            .line()
            .x((d: any) => x(getLineXProp(d)))
            .y((d: any) => 10);
        return line;
    }

    useEffect(() => {
        if (elemDotsGraphic.current && data.length > 0) {
            data.forEach((val) => {
                d3.select(elemDotsGraphic.current)
                    .datum([val])
                    .append("path")
                    .attr("data-key", function (d) { return getLineXProp(d[0]); })
                    .attr("class", "dot")
                    .attr("d", getLine(getX()));
            })

        }
    }, [data, elemDotsGraphic])
    return (
        <g ref={elemDotsGraphic}></g>
    );
}