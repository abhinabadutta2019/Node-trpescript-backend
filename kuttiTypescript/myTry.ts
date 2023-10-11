interface IAge {
  cat: number;
  dog: number;
  catName?: string | number;
  // abc?: string,
}

const age: IAge = {
  cat: 1,
  dog: 2,
};

console.log(age, "age");

const newAge: IAge = {
  cat: 1,
  dog: 2,
};
console.log(newAge, "newAge");

//
const bigAge: IAge = {
  cat: 1,
  dog: 2,
  catName: "Sta",
};

console.log(bigAge, "bigAge");
