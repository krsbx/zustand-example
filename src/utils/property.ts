export const castToType = <T>(value: unknown): T => value as T;

// eslint-disable-next-line @typescript-eslint/ban-types
export const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  property: Y
  // eslint-disable-next-line no-prototype-builtins
): obj is X & Record<Y, unknown> => obj.hasOwnProperty(property);
