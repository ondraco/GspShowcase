import { Component, OnInit } from '@angular/core';
import { ValueProvider } from '../common/ValueProvider/valueProvider';

@Component({
  selector: 'app-ambient-temp',
  templateUrl: './ambient-temp.component.html',
  styleUrls: ['./ambient-temp.component.less']
})
export class AmbientTempComponent implements OnInit {

  private readonly tempApiPath: string = 'ambient_temp';

  temp = 0;

  constructor(private valueProvider: ValueProvider) { }

  ngOnInit(): void {
    this.getTemp();
    setInterval(() => this.getTemp(), 1000);
  }

  getTemp(): void {
    this
      .valueProvider
      .get<number>(this.tempApiPath)
      .toPromise()
      .then(x => this.temp = x);
  }
}
