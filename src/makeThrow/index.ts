import type { MakeThrowExtendedOptions, MakeThrowOptions } from '@/makeThrow/types';

export const makeThrow = <T = any>(options: MakeThrowOptions = '') => {
  if (typeof options === 'string') {
    throw options;
  }

  const {
    message = '',
    httpStatus = '',
    data = '',
    deleteEmpty = true,
    condition = true,
  } = options as MakeThrowExtendedOptions<T>;

  const throwObject = {
    message,
    httpStatus,
    data,
  };

  if (deleteEmpty) {
    for (const key in throwObject) {
      if (throwObject[key] === '') delete throwObject[key];
    }
  }

  const isThrow = typeof condition === 'function' ? condition() : condition;

  if (isThrow) {
    throw throwObject;
  }
};
