import { ValueCollection } from '../common/ValueProvider/tagValue';
import { ValueProvider } from '../common/ValueProvider/valueProvider';

export class Engine {
    readonly MaxOkTemp = 100;
    Name = 'Engine';
    SpeedTagId = -1;
    TempTagIs = -1;
    OnTagId = -1;
    IsOk = true;
    NameTagId = -1;
    Image = '';
    Speed = 0;
    IsOn = false;
    Uptime = 0;
    readonly MaintenanceUptime = 1000;
    Maintenance = 0;
    Temperature = 0;
    valueProvider: ValueProvider;

    public constructor(provider: ValueProvider, init?: Partial<Engine>) {
        Object.assign(this, init);
        this.valueProvider = provider;
    }

    getStatus(): string {
        return this.IsOn ? 'Running...' : 'Stopped';
    }

    getIssues(): string {
        if (this.Temperature > 100) {
            return 'Too Hot!';
        }

        return 'Status OK';
    }

    setValues(values: ValueCollection): void {
        values.parsedValues.forEach((v) => {
            if (v.key === this.NameTagId) {
                this.Name = v.val;
            }
            if (v.key === this.SpeedTagId) {
                this.Speed = v.asNumeric();
            }
            if (v.key === this.TempTagIs) {
                this.Temperature = v.asNumeric();
                this.IsOk = this.Temperature < this.MaxOkTemp;
            }
            if (v.key === this.OnTagId) {
                this.IsOn = v.asBoolean();
            }
        });
    }

    updateMaintenance(): void {
        void this.valueProvider
            .get<number>(`uptime/${this.OnTagId.toString()}`)
            .toPromise()
            .then((x) => {
                this.Uptime = x;
                const maintenance = this.Uptime / (this.MaintenanceUptime / 100);
                this.Maintenance = Math.min(maintenance, 100);
            });
    }

    startStop(): void {
        this.valueProvider.setValue(this.OnTagId, !this.IsOn);
    }
}
