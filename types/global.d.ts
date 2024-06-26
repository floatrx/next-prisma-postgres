import React from 'react';

// Global type declarations for React components
declare global {
  // Any function
  export type AnyFn = (...args: any[]) => any;
  // Just empty object
  type EmptyObj = Record<string, unknown>;
  // Any object
  type AnyObj = Record<string, any>;
  // React fn component with children
  type FC<T = object> = React.FunctionComponent<React.PropsWithChildren<T>>;
  // React fn component without children
  type RC<T = object> = React.FunctionComponent<T>;
  // Get available props from element (e.g. button, input, div, etc.)
  type ComponentProps<T> = React.ComponentProps<T>;
  // Next page props
  type PageProps<Params = EmptyObj, SearchParams = EmptyObj> = {
    params: Partial<Params>;
    searchParams: Partial<SearchParams>;
  };
}
