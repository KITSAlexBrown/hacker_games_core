import { Component } from "@angular/core";
import { D3Service, D3, Selection } from "d3-ng2-service";
import { axisTop } from "d3-ng2-service/src/bundle-d3";
import * as results from "./stub-data";

@Component({
    selector: 'kf-graph',
    templateUrl: './kf-graph.component.html',
    styleUrls: ['./kf-graph.component.scss']
})

export class KfGraphComponent {
    lineData: any[];
    private d3: D3;
    moodGraphArray: any[];

    constructor(d3Service: D3Service) {
        this.moodGraphArray = [];
        this.d3 = d3Service.getD3();
    }
    ngOnInit() {
        this.plotGraph();
    }
    async plotGraph() {
        await results.results.results.results.map((object) => {
            let newDate;
            let newMood: number;
            newDate = new Date(object.date);
            newMood = object.data.reduce((x, y) => x += y) / object.data.length;
            this.moodGraphArray.push({
                "date": newDate,
                "mood": Math.ceil(newMood)
            })
        })

        let margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        let parseTime = this.d3.timeParse("%d-%m-%Y");

        let x = this.d3.scaleTime().range([0, width]);
        let y = this.d3.scaleLinear().range([height, 0]);

        let valueline = this.d3.line<MoodPoint>()
            .x((d) => { 
                console.log(x(d.date))
                return Math.ceil(x(d.date)); })
            .y((d) => { 
                // console.log('the mood', d.mood);
                // console.log('the scaled point', y(d.mood));
                console.log(d.mood);
                return y(d.mood); });

        let svg = this.d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "line")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        x.domain(this.d3.extent(this.moodGraphArray, function (d) { return d.date; }));

        y.domain([0, this.d3.max(this.moodGraphArray, function (d) { return d.mood; })]);

        svg.append("path")
            .data([this.moodGraphArray])
            .attr("class", "line")
            .attr("d", valueline);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(this.d3.axisBottom(x));

        svg.append("text")
            .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Date");

        svg.append("g")
            .call(this.d3.axisLeft(y));

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Value");
    }
}

export interface MoodPoint {
    "date": number;
    "mood": number;
}