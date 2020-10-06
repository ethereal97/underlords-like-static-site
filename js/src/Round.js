export default class Round {
  constructor() {
    this.current = 1;
  }
  
  increment () {
    this.current++;
  }
  
  toString() {
    return this.current;
  }
}