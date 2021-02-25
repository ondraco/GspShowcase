import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import * as gauge from 'gaugeJS';
import { Subscription } from 'rxjs';
import { DataProvider } from '../common/DataProvider/dataProvider';
import { Engine } from '../common/engine';
import { ValueCollection } from '../common/ValueProvider/tagValue';
import { ValueProvider } from '../common/ValueProvider/valueProvider';
import { AppColorsService } from '../services/app-colors.service';
import { UserDetailService } from '../services/auth-workflow/user-detail.service';
import { ViewportService } from '../services/viewport/viewport.service';

@Component({
    selector: 'app-gauge-display',
    templateUrl: './gauge-display.component.html',
    styleUrls: ['./gauge-display.component.scss'],
})
export class GaugeDisplayComponent implements OnInit, OnDestroy, AfterViewInit {
    optTemp: object = {
        angle: 0, /// The span of the gauge arc
        lineWidth: 0.3, // The line thickness
        pointer: {
            length: 0.6, // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
        },
        colorStart: '#6FADCF', // Colors
        colorStop: '#8FC0DA', // just experiment with them
        strokeColor: '#E0E0E0', // to see which ones work best for you
        generateGradient: true,
        staticLabels: {
            font: '14px sans-serif', // Specifies font
            labels: [0, 20, 40, 60, 80, 100, 120], // Print labels at these values
            color: '#000000', // Optional: Label text color
            fractionDigits: 0, // Optional: Numerical precision. 0=round off.
        },
        staticZones: [
            { strokeStyle: '#30B32D', min: 0, max: 80, height: 1 }, // Green
            { strokeStyle: '#FFDD00', min: 80, max: 100, height: 1 }, // Yellow
            { strokeStyle: '#F03E3E', min: 100, max: 120, height: 1.1 }, // Red
        ],
    };

    optSpeed: object = {
        angle: 0, /// The span of the gauge arc
        lineWidth: 0.3, // The line thickness
        pointer: {
            length: 0.6, // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
        },
        colorStart: '#6FADCF', // Colors
        colorStop: '#8FC0DA', // just experiment with them
        strokeColor: '#E0E0E0', // to see which ones work best for you
        staticLabels: {
            font: '14px sans-serif', // Specifies font
            labels: [0, 500, 1000, 1500, 2000, 2500, 3000], // Print labels at these values
            color: '#000000', // Optional: Label text color
            fractionDigits: 0, // Optional: Numerical precision. 0=round off.
        },
        staticZones: [
            { strokeStyle: '#30B32D', min: 0, max: 2000, height: 1 }, // Green
            { strokeStyle: '#FFDD00', min: 2000, max: 2500, height: 1 }, // Yellow
            { strokeStyle: '#F03E3E', min: 2500, max: 3000, height: 1.1 }, // Red
        ],
    };

    constructor(
        private valueProvider: ValueProvider,
        private dataProvider: DataProvider,
        public readonly userDetailService: UserDetailService,
        public readonly appColorService: AppColorsService,
        private readonly _viewportService: ViewportService
    ) {}

    GetEngines(): Engine[] {
        return this.dataProvider.engines;
    }

    private newDataSubscription: Subscription | undefined;

    ngOnInit(): void {
        this.newDataSubscription = this.dataProvider.newData.subscribe((s: ValueCollection) => this.update(s));
    }

    isSmall(): boolean {
        return this._viewportService.isSmall();
    }

    ngOnDestroy(): void {
        this.newDataSubscription!.unsubscribe();

        (window as any).AnimationUpdater.elements = [];
        (window as any).AnimationUpdater.animId = null;
    }

    ngAfterViewInit(): void {
        this.dataProvider.engines.forEach((e, i) => {
            this.initSpeedGauge(i);
            this.initTempGauge(i);
        });
    }

    private tempGauges: any[] = new Array();
    private speedGauges: any[] = new Array();

    private initSpeedGauge(id: number): void {
        const target = document.getElementById('canvas' + id + '_speed');
        const g = new gauge.Gauge(target).setOptions(this.optSpeed);
        g.maxValue = 3000; // set max gauge value
        g.setMinValue(0); // set min value
        g.set(0);
        //g.percentColors = [[0.0, "#a9d70b" ], [0.5, "#f9c802"], [0.7, "#ff0000"]];

        this.speedGauges.push(g);
    }

    private initTempGauge(id: number): void {
        const target = document.getElementById('canvas' + id + '_temp');
        const g = new gauge.Gauge(target).setOptions(this.optTemp);
        g.maxValue = 120; // set max gauge value
        g.setMinValue(0); // set min value

        this.tempGauges.push(g);
    }

    update(data: ValueCollection): void {
        this.dataProvider.engines.forEach((e, i) => {
            this.tempGauges[i].set(e.Temperature);
            this.speedGauges[i].set(e.Speed);
        });
    }
}
