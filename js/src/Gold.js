export default class Gold {
  constructor() {
    this._previous = null;
    this._logged = [];
    this._onchanged = [];
    this.balance = 0;
  }
  
  subtract(value, message) {
    var balance = this.balance - Number(value);
    this._previous = this.balance;
    this.balance = balance;
    this.log(message || 'subtract');
    this._onchanged.forEach(cb => cb.call(this));
  }
  
  add(value, message) {
    var balance = this.balance + Number(value);
    this._previous = this.balance;
    this.balance = balance;
    this.log(message || 'added');
    this._onchanged.forEach(cb => cb.call(this));
  }
  
  log(message) {
    var status = 'credit';
    
    if (this.balance < this._previous) {
      status = 'debit';
    }
    
    var diff = this.balance - this._previous;
    
    this._logged.push({
      time: new Date,
      status,
      diff,
      message
    });
  }
  
  hasMoreThan(amount) {
    return this.balance > amount;
  }
  
  hasLessThan(amount) {
    return this.balance < amount;
  }
  
  onchange(callback) {
    this._onchanged.push(callback);
  }
  
  toString() {
    return this.balance;
  }
}