interface ICreateTaskBody {
  name: string;
  completed: boolean;
}

const createTask = async (req: Request, res: Response) => {
  try {
    const body: ICreateTaskBody = req.body;

    const { name, completed } = body;

    if (!name) {
      throw new Error("Name is required");
    }
    if (!completed) {
      throw new Error("Completed is required");
    }

    const task = new Task({
      name: name,
      completed: completed,
    });
    console.log(task);

    const test1 = await test2(1, 3);

    const test2 = await test3({
      a: 1,
      b: 2,
    });

    interface IAge {
      a: number;
      b: number;
      c?: number;
      // abc?: string,
    }

    const age: IAge = {
      a: 1,
      b: 2,
    };

    age.abc = "123";

    age.c = 3;

    //
    const createdTask = await task.save();
    res.json({ createdTask: createdTask });
  } catch (err) {
    res.json(err);
  }
};

const test2 = async (a: number, b: number): Promise<number> => {
  return a + b;
};

interface ITest3 {
  a: number;
  b: number;
}

interface IMan {
  a: number;
  b: number;
}

const test3 = async (man: IMan): Promise<ITest3> => {
  return {
    a: man.a,
    b: man.b,
  };
};

const test4 = async (man: { a: number; b: number }): Promise<ITest3> => {
  return {
    a: man.a,
    b: man.b,
  };
};
