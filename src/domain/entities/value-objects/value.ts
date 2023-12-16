export class Value {
  public number: number;

  constructor(number: number) {
    this.number = number;
  }

  static verifyNumberIsNotNegative(number:number){
    const valueNumber = Math.abs(number)
    
    return new Value(valueNumber)
  }

}
