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
