type FilterParams = {
  order_by?: string;
  sort?: string;
  filter: object;
  term?: string;
};

type PaginationParams = {
  page?: number;
  limit?: number;
};

export type DefaultRequestParams = PaginationParams & FilterParams;

export const defaultParams: DefaultRequestParams = {
  order_by: "id",
  sort: "ASC",
  filter: {},
  page: 1,
  limit: 10,
};
