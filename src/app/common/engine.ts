import { ValueCollection } from '../common/ValueProvider/tagValue';
import { ValueProvider } from '../common/ValueProvider/valueProvider';

export class Engine {
  Name: string = 'Engine';
  SpeedTagId: number = -1;
  TempTagIs: number = -1;
  OnTagId: number = -1;
  NameTagId: number = -1;
  Image: string = '';
  Speed: number = 0;
  IsOn: boolean = false;
  Uptime: number = 0;
  readonly MaintenanceUptime: number = 1000;
  Maintenance: number = 0;
  Temperature: number = 0;
  valueProvider: ValueProvider;

  public constructor(provider: ValueProvider, init?: Partial<Engine>) {
    Object.assign(this, init);
    this.valueProvider = provider;
  }

  setValues(values: ValueCollection): void {
    values.parsedValues.forEach((v) => {
      if (v.key === this.NameTagId) { this.Name = v.val; }
      if (v.key === this.SpeedTagId) { this.Speed = v.asNumeric(); }
      if (v.key === this.TempTagIs) { this.Temperature = v.asNumeric(); }
      if (v.key === this.OnTagId) { this.IsOn = v.asBoolean(); }
    });
  }

  updateMaintenance(): void {
    this.valueProvider
      .get<number>('uptime/' + this.OnTagId.toString())
      .toPromise()
      .then((x) => {
        this.Uptime = x;
        const maintenance = this.Uptime / (this.MaintenanceUptime / 100);
        this.Maintenance = Math.min(maintenance, 100);
      });
  }

  StartStop(): void {
    this.valueProvider.setValue(this.OnTagId, !this.IsOn);
  }
}
