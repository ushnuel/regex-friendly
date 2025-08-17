import { transformations } from "./transformations";
import { validations } from "./validations";
import { advanced } from "./advanced";
import { rexFunctions } from "./functions";

// ------------ Types -----------------------
type Transformations = typeof transformations;
type Validations = typeof validations;
type Advanced = typeof advanced;
type REXFunctions = typeof rexFunctions;

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

export type RegexFriendlyType = ((input?: string) => Chainable) &
  Transformations &
  Validations &
  Advanced &
  REXFunctions;

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

// ---------- Exports ----------
const RegexFriendly: RegexFriendlyType = Object.assign(
  regexify,
  transformations,
  validations,
  advanced,
  rexFunctions
);

export default RegexFriendly;
export { transformations, validations, advanced, rexFunctions };
