export class ValueTagInput {
  key = '';
  val = '';
}

export class ValueTag {
  key: number;
  val: string;

  private parsedVal: any = undefined;

  constructor(key: number, val: any) {
    this.key = key;
    this.val = val;
  }

  asBoolean(): boolean {
    if (this.parsedVal !== undefined) {
      return this.parsedVal;
    }

    if (typeof this.val === 'number') {
      this.parsedVal = this.val === 1;
    }
    else if (this.val === '1') {
      this.parsedVal = true;
    } else this.parsedVal = false;

    return this.parsedVal;
  }

  asNumeric(): number {
    if (this.parsedVal !== undefined) {
      return this.parsedVal;
    }

    if (typeof this.val === 'number') {
      this.parsedVal = this.val;
    } else {
      this.parsedVal = parseInt(this.val);
    }

    return this.parsedVal;
  }
}

export class ValueCollection {
  values: ValueTagInput[] | undefined;
  parsedValues: ValueTag[] = new Array();

  static Parse(values: ValueTagInput[] | undefined): ValueCollection {
    let collection = new ValueCollection();

    values!.forEach((v) => {
      collection.parsedValues?.push(new ValueTag(parseInt(v.key), v.val));
    });

    return collection;
  }
}
