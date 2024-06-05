import { useState } from "react";

export default function usePagination() {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  return {
    onPaginationChange: setPagination,
    pagination,
  };
}
