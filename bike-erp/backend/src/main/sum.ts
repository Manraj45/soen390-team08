let myAdd: (baseValue: number, increment: number) => number = function (
    x: number,
    y: number
  ): number {
    return x + y;
  };

  module.exports = myAdd
  console.log(myAdd(1,7))