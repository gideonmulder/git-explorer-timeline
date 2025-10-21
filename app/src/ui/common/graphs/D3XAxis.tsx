import React, { useEffect } from "react";
import * as d3 from "d3";

interface ID3XAxisProps {
    graphPadding: number,
    data: any[],
    getX: () => d3.ScaleTime<number, number, never>,
    graphHeight: number
}

export default function D3XAxis({ graphPadding, data, getX, graphHeight }: ID3XAxisProps) {

    const elemXAxisG = React.useRef<SVGGElement>(null);

    //TODO: logic to get the right spacing and ticks
    const getBottomTickArguments = () => {
        let tickArguments = [d3.timeMinute.every(15)];
        //switch (dateRange) {            
        //    case GraphDateRange.Day:
        //        tickArguments = [d3.timeHour.every(4)]
        //        break;
        //    case GraphDateRange.Week:
                tickArguments = [d3.timeDay.every(1)]
        //        break;
        //    case GraphDateRange.Month:
        //        tickArguments = [d3.timeDay.every(5)]
        //        break;
        //    case GraphDateRange.Year:
        //        tickArguments = [d3.timeMonth.every(1)]
        //        break;
        //    case GraphDateRange.All:
        //        tickArguments = [d3.timeYear.every(1)]
        //        break;
        //}
        return tickArguments;
    }

    const getBottomTickFormat = () => {

        let tickFormat = (t: Date) => {
            return t.getHours().toString().padStart(2, '0') + ":" + t.getMinutes().toString().padStart(2, '0');
        }
        //switch (dateRange) {
                tickFormat = (t) => {
                    return t.getDate().toString().padStart(2, '0') + "-" + (t.getMonth() + 1).toString().padStart(2, '0');
                }
        //        break;
        //}
        return tickFormat;
    }

    useEffect(() => {
        if (elemXAxisG.current && data.length > 0) {
            const x = getX();
            const tickFormat = getBottomTickFormat();
            const tickArguments = getBottomTickArguments();

            var xAxis = d3.axisBottom(x)
                .tickArguments(tickArguments).tickFormat(t => tickFormat(t as any));
            d3.select(elemXAxisG.current)
                .call(xAxis);
        }
    }, [data, elemXAxisG]);

    return (
        <g className="x-axis" transform={"translate(0, " + (graphHeight - graphPadding) + ")"} ref={elemXAxisG}></g>
    )
}