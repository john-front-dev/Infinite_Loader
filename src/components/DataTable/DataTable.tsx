import React, { useState, useEffect, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getUsers } from "../../api/api";
import type { User } from "../../types/types";
import { columns } from "./columns";
import "./DataTable.css";

const DataTableComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers(page);
      setUsers((prevUsers) => [...prevUsers, ...data]);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore]  
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
    enablePagination: false,
    enableRowNumbers: true,
    enableRowVirtualization: true,
  });

  return (
    <div className="table" onScroll={handleScroll}>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default DataTableComponent;
