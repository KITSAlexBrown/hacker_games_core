import { Component, HostListener } from "@angular/core";
import { D3Service, D3, Selection } from "d3-ng2-service";
import { axisTop } from "d3-ng2-service/src/bundle-d3";
import { Router } from "@angular/router";
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
    sentimentGraphArray: any[];
    width: number;
    height: number;
    margin: any;
    x: any;
    y: any;
    svg: any;

    @HostListener('window:resize') onResize() {
        this.plotGraph();
    }

    constructor(d3Service: D3Service, private route: Router) {
        this.moodGraphArray = [];
        this.sentimentGraphArray = [];
        this.d3 = d3Service.getD3();
    }
    ngOnInit() {
        this.mapApiData(results.results.results.sentiment, this.sentimentGraphArray);
        this.mapApiData(results.results.results.results, this.moodGraphArray);
        this.orientInitialScales();
        this.plotGraph();
    }

    reCalculateSize(windowWidth) {
        this.margin = { top: 200, right: 20, bottom: 400, left: 50 },
            this.width = windowWidth - this.margin.left - this.margin.right,
            this.height = 500 - this.margin.top
    }

    orientInitialScales() {
        this.reCalculateSize(window.innerWidth);
        this.x = this.d3.scaleTime().range([0, this.width]);
        this.y = this.d3.scaleLinear().range([this.height, 0]);
        this.svg = this.d3.select("#visualisation")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("class", "line")
            .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");
        let valueline = this.d3.line<MoodPoint>()
            .x((object) => { return Math.ceil(this.x(object.date)); })
            .y((object) => { return this.y(object.mood); });

        let valueline2 = this.d3.line<MoodPoint>()
            .x((object) => { return Math.ceil(this.x(object.date)); })
            .y((object) => { return this.y(object.mood); });

        this.x.domain(this.d3.extent(this.moodGraphArray, function (d) { return d.date; }));

        this.y.domain([0, this.d3.max(this.moodGraphArray, function (d) { return d.mood; })]);
        console.log(this.moodGraphArray);
        this.svg.append("path")
            .data([this.moodGraphArray])
            .attr("class", "line")
            .attr("d", valueline);

        this.svg.append("path")
            .data([this.sentimentGraphArray])
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline2);

        this.svg.append("g")
            .style("font-size", "6.5px")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.d3.axisBottom(this.x));

        this.svg.append("text")
            .attr("transform",
            "translate(" + (this.width / 2) + " ," +
            (this.height + this.margin.top - 160) + ")")
            .style("text-anchor", "middle")
            .text("Date");

        this.svg.append("g")
            .call(this.d3.axisLeft(this.y));

        // text label for the y axis
        this.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margin.left)
            .attr("x", 0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Mood");

        const n = 7;

        let xScale = this.d3.scaleLinear()
            .domain([0, n - 1]) // input
            .range([0, this.width]);

        let yScale = this.d3.scaleLinear()
            .domain([0, n - 1])
            .range([this.height, 0]);



        let thisLink = this;
        this.svg.selectAll(".dot")
            .data(this.moodGraphArray)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function (d, i) {
                console.log(thisLink.height, 'height');
                return xScale(i)
            })
            .attr("cy", function (d) {
                console.log(thisLink.width, 'width');
                return yScale(d.mood)
            })
            .attr("r", 5)
            .style("fill", function (d) { return "blue"; })
            .on("click", function(event){
                let newDate = new Date(event.date);
                console.log("hello", newDate);
                thisLink.route.navigate(['/notes/id', '19-01-2018']);
            });
    }


    mapApiData(arrayToMap: any[], arrayMappedTo: any[]) {
        arrayToMap.map((object) => {
            let newDate;
            let newMood: number;
            newDate = new Date(object.date);
            newMood = object.data.reduce((x, y) => x += y) / object.data.length;
            arrayMappedTo.push({
                "date": newDate,
                "mood": Math.ceil(newMood)
            })
        })
    }

    plotGraph() {
        this.reCalculateSize(window.innerWidth);
        this.x.range([0, this.width]);
        this.y.range([this.height, 0]);
    }
}

export interface MoodPoint {
    "date": number;
    "mood": number;
}