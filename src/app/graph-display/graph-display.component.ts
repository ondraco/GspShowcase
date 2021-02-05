import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValueCollection } from '../common/ValueProvider/tagValue';
import { ValueProvider } from '../common/ValueProvider/valueProvider';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Engine } from '../common/engine';
import { DataProvider } from '../common/DataProvider/dataProvider';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../services/auth-workflow/user-detail.service';
import { ViewportService } from '../services/viewport/viewport.service';
import { AppColorsService } from '../services/app-colors.service';

@Component({
    selector: 'app-graph-display',
    templateUrl: './graph-display.component.html',
    styleUrls: ['./graph-display.component.scss'],
})
export class GraphDisplayComponent implements OnInit, OnDestroy {
    private readonly lineChartDataCount = 60;
    lineChartData: ChartDataSets[] = [];
    points = 0;
    lineChartLabels: Label[] = [];
    lineChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: (item): string => `${item.yLabel} °C`,
                title: (): string => 'Temperature',
            },
        },
        scales: {
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        labelString: 'Temperature [°C]',
                        display: true,
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 120,
                    },
                },
            ],
        },
    };

    chartColors: Color[] = [
        {
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
        },
        {
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
        },
        {
            backgroundColor: 'rgba(0,0,255,0.3)',
            borderColor: 'blue',
        },
    ];

    lineChartLegend = true;
    lineChartType: ChartType = 'line';
    lineChartPlugins = [];

    barChartData: ChartDataSets[] = [];

    barChartLabels: Label[] = [];
    barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        labelString: 'Speed [RPM]',
                        display: true,
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 3000,
                    },
                },
            ],
        },
    };

    barChartLegend = true;
    barChartType: ChartType = 'bar';
    barChartPlugins = [];

    isSmall(): boolean {
        return this._viewportService.isSmall();
    }

    GetEngines(): Engine[] {
        return this.dataProvider.engines;
    }

    constructor(
        private readonly valueProvider: ValueProvider,
        private readonly dataProvider: DataProvider,
        public readonly userDetailService: UserDetailService,
        public readonly appColorService: AppColorsService,
        private readonly _viewportService: ViewportService
    ) {}

    update(data: ValueCollection): void {
        this.updateBarGrap();
        this.updateLineGraph();
    }

    private newDataSubscription: Subscription | undefined;

    ngOnDestroy(): void {
        this.newDataSubscription!.unsubscribe();
    }

    ngOnInit(): void {
        this.dataProvider.engines.forEach((engine) => {
            this.lineChartData.push({ data: [], label: engine.Name });
            this.barChartData.push({ data: [], label: engine.Name });
        });

        this.barChartLabels.push('');

        this.newDataSubscription = this.dataProvider.newData.subscribe((s: ValueCollection) => this.update(s));

        const countString = this.lineChartDataCount.toString();

        for (let i = 0; i < this.lineChartDataCount; ++i) {
            this.lineChartLabels.push(this.points.toString());
            this.points++;
        }

        this.valueProvider
            .get<LineGraphPoint[]>('getdb/tempA?count=' + countString)
            .toPromise()
            .then((x) => this.initGraph(0, x));
        this.valueProvider
            .get<LineGraphPoint[]>('getdb/tempB?count=' + countString)
            .toPromise()
            .then((x) => this.initGraph(1, x));
        this.valueProvider
            .get<LineGraphPoint[]>('getdb/tempC?count=' + countString)
            .toPromise()
            .then((x) => this.initGraph(2, x));
    }

    initGraph(index: number, history: LineGraphPoint[]): void {
        for (let i = history.length - 1; i >= 0; i--) {
            this.lineChartData[index].data?.push(history[i].val);
        }
    }

    updateBarGrap(): void {
        for (let i = 0; i < this.dataProvider.engines.length; i++) {
            const engine = this.dataProvider.engines[i];
            this.barChartData[i].data = [engine.Speed];
            this.barChartData[i].label = engine.Name;
        }
    }

    updateLineGraph(): void {
        this.lineChartLabels.push(this.points.toString());
        this.points++;

        for (let i = 0; i < this.dataProvider.engines.length; i++) {
            const engine = this.dataProvider.engines[i];
            const data = this.lineChartData[i].data;

            if (data !== undefined && data.length >= this.lineChartDataCount) {
                data.shift();
            }

            this.lineChartData[i].data?.push(engine.Temperature);
            this.lineChartData[i].label = engine.Name;
        }

        if (this.lineChartLabels.length >= this.lineChartDataCount) {
            this.lineChartLabels.shift();
        }
    }
}

export interface LineGraphPoint {
    val: number;
    time: string;
}
