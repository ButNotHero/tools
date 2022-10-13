export interface MakeThrowExtendedOptions<T> {
  message?: string | number;
  httpStatus?: string | number;
  data?: T;
  deleteEmpty?: boolean;
  condition?: (() => boolean | void) | boolean;
}

export type MakeThrowOptions<T = any> = MakeThrowExtendedOptions<T> | string | number;
