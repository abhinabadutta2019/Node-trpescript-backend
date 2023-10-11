//blog link
// https://www.tutorialspoint.com/typescript/typescript_interfaces.htm
interface RunOptions {
  program: string;
  commandline: string[] | string | (() => string);
  //   commandline: string[];
}

//commandline as string

//commandline as a string array
let options: RunOptions = { program: "test1", commandline: ["Hello", "World"] };
console.log(options.commandline[0]);
console.log(options.commandline[1]);

//
let options2: RunOptions = { program: "test2", commandline: "Chrishmas" };
console.log(options2.commandline);
