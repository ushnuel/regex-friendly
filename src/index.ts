import { transformations } from "./transformations";
import { validations } from "./validations";
import { advanced } from "./advanced";
import { rexFunctions } from "./functions";

type Transformations = typeof transformations;
type Validations = typeof validations;

// Utility type to get the rest of the parameters of a function
type Tail<F extends (arg0: any, ...args: any[]) => any> = F extends (
  arg0: any,
  ...args: infer A
) => any
  ? A
  : never;

type Chainable = {
  [K in keyof Transformations]: (
    ...args: Tail<Transformations[K]>
  ) => Chainable;
} & {
  [K in keyof Validations]: (...args: Tail<Validations[K]>) => boolean;
} & {
  result: () => string;
};

function regexify(input?: string): Chainable {
  let value = input || "";

  const chain = {} as Chainable;

  for (const key of Object.keys(transformations) as (keyof Transformations)[]) {
    chain[key] = (...args: Tail<(typeof transformations)[typeof key]>) => {
      value = (transformations[key] as any)(value, ...args);
      return chain;
    };
  }

  for (const key of Object.keys(validations) as (keyof Validations)[]) {
    chain[key] = (...args: Tail<(typeof validations)[typeof key]>) => {
      return (validations[key] as any)(value, ...args);
    };
  }

  chain.result = () => value;

  return chain;
}

// Export as hybrid API
export default Object.assign(
  regexify,
  transformations,
  validations,
  advanced,
  rexFunctions
);
