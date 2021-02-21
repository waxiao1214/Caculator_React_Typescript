function Str2Array(str:string) {
  let arr:Array<any>= [];
  let j = -1;
  for (let i = 0; i < str.length; i++) {
    if ((arr[j] >= 0 && str[i] >= '0') || str[i] == ".") {
      arr[j] = arr[j] + str[i];
    } else {
      if (arr[j] === ")" && str[i] === "(") {
        j++;
        arr[j] = "*";
      }
      j++;
      arr[j] = str[i];
    }
  }
  return arr;
}

function SimpleCalc(arr:Array<any>) {
  let j = 0;
  let w = [];
  w[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    switch (arr[i]) {
      case "+":
        j++;
        w[j] = arr[i + 1];
        break;
      case "-":
        j++;
        w[j] = -arr[i + 1];
        break;
      case "*":
        w[j] = w[j] * arr[i + 1];
        break;
      case "/":
        w[j] = w[j] / arr[i + 1];
        break;
      default:
        break;
    }
  }
  let sum = 0;
  for (let i = 0; i < w.length; i++) {
    sum = (sum * 1000000 + 1000000 * Number(w[i])) / 1000000;
  }
  return sum;
}

function ReduceArr(arr:any) {
  let b = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      b = i;
    }
    if (arr[i] === ")") {
      let suffArr = arr.slice(0, b);
      suffArr.push(SimpleCalc(arr.slice(b + 1, i)));
      suffArr.push(...arr.slice(i + 1, arr.length));
      return suffArr;
    }
  }
  return arr;
}

function ArrayCalculator(arr:any):any {
  let newArray = ReduceArr(arr);
  if (arr.length === newArray.length) {
    return SimpleCalc(arr);
  } else {
    return ArrayCalculator(newArray);
  }
}

function caculate(str:string) {
  // code goes here
  let expArr = Str2Array(str);
  let value = ArrayCalculator(expArr);
  return value;
}

// keep this function call here

export { caculate }
