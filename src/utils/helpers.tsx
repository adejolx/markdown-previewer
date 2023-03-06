export function composeClassNames(internal: string, userDefined?: string) {
  if (userDefined) {
    internal += ` ` + userDefined;
  }
  return internal;
}

export function makeId(...args: (string | number)[]) {
  return args.filter((arg) => Boolean(arg)).join("-");
}

let globalCounter = [{ tally: 0 }];

function incrementId() {
  let currentItem = globalCounter.length - 1;

  return function () {
    let nextVal = globalCounter[currentItem].tally++;
    globalCounter.push({ tally: nextVal });

    return globalCounter[currentItem].tally;
  };
}
export const useId = incrementId();
