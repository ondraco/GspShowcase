import { Injectable } from '@angular/core';
import * as Colors from '@pxblue/colors/dist/palette';
import { Engine } from '../common/engine';

@Injectable({
    providedIn: 'root',
})
export class AppColorsService {
    constructor() {}

    readonly tempOkBackColor = Colors.white[100];
    readonly tempWarnBackColor = Colors.white[400];
    readonly tempErrorBackColor = Colors.white[400];

    readonly tempOkColor = Colors.gray[400];
    readonly tempWarnColor = Colors.orange[400];
    readonly tempErrorColor = Colors.red[400];

    readonly healthOkColor = this.tempOkColor;
    readonly healthWarnColor = this.tempWarnColor;
    readonly healthErrorColor = this.tempErrorColor;

    getEngineTempBackColor(engine: Engine): string {
        if (engine.Temperature > engine.ErrorTemp) {
            return this.tempErrorBackColor;
        } else if (engine.Temperature > engine.WarnTemp) {
            return this.tempWarnBackColor;
        }

        return this.tempOkBackColor;
    }

    getEngineHealthColor(engine: Engine): string {
        if (engine.MaintenanceCritical) {
            return this.healthErrorColor;
        } else if (engine.MaintenanceWarn) {
            return this.healthWarnColor;
        }

        return this.healthOkColor;
    }

    getEngineTempColor(engine: Engine): string {
        if (engine.Temperature > engine.ErrorTemp) {
            return this.tempErrorColor;
        } else if (engine.Temperature > engine.WarnTemp) {
            return this.tempWarnColor;
        }

        return this.tempOkColor;
    }
}
