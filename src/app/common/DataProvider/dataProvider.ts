import { EventEmitter, Injectable } from '@angular/core';
import { Engine } from '../engine';
import { ValueCollection } from '../ValueProvider/tagValue';
import { ValueProvider } from '../ValueProvider/valueProvider';

@Injectable({
  providedIn: 'root',
})
export class DataProvider {
  engines: Engine[] = [
    new Engine(this.valueProvider, {
      Image: 'assets/img/engine.jpg',
      Name: 'Engine',
      NameTagId: 10,
      OnTagId: 11,
      TempTagIs: 12,
      SpeedTagId: 13,
    }),
    new Engine(this.valueProvider, {
      Image: 'assets/img/engine2.jpg',
      Name: 'Engine',
      NameTagId: 20,
      OnTagId: 21,
      TempTagIs: 22,
      SpeedTagId: 23,
    }),
    new Engine(this.valueProvider, {
      Image: 'assets/img/engine3.jpg',
      Name: 'Engine',
      NameTagId: 30,
      OnTagId: 31,
      TempTagIs: 32,
      SpeedTagId: 33,
    }),
  ];

  constructor(private valueProvider: ValueProvider) {
    setInterval(() => this.getValues(), 1000);
  }

  newData: EventEmitter<ValueCollection> = new EventEmitter();

  getValues(): any {
    return this.valueProvider
      .getValue(0)
      .subscribe((data: any) => this.updateValue(data));
  }

  updateValue(data: ValueCollection): void {
    data = ValueCollection.Parse(data.values);

    if (data.parsedValues !== undefined) {
      this.engines.forEach((engine) => {
        engine.setValues(data);
        engine.updateMaintenance();
      });

      this.newData.emit(data);
    }
  }
}
