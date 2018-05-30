// @flow

export default class Foo {
  constructor() {
    this.foo = this._foo.bind(this);
    this.initialFoo = 40;
  }
  _foo() {
    return this.initialFoo + 2;
  }
}
