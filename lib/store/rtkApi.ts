import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'query-string';

export const FEATURE_LIST = ['todo'] as const;
export type FeatureList = (typeof FEATURE_LIST)[number];

export const rtkApi = createApi({
  reducerPath: '_api',
  tagTypes: FEATURE_LIST,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    paramsSerializer: (params) => qs.stringify(params, { skipEmptyString: true, skipNull: true }),
  }),
  endpoints: () => ({}), // -> use rtkApi.injectEndpoints()
});
