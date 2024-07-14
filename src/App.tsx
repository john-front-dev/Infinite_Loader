import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import DataTable from "./components/DataTable";
import CreateUserModal from "./components/CreateUserModal";
import type { User } from "./types/types";

function App({}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Box mt={2} mb={2} display="flex" justifyContent="space-between">
        <h2>Infinite Loader</h2>
        <Button variant="contained" onClick={handleOpenModal}>
          Создать пользователя
        </Button>
      </Box>
      <CreateUserModal
        open={open}
        handleCloseModal={handleCloseModal}
        onCreateUser={handleCloseModal}
      />
      <div
        style={{
          border: "2px solid #E0E0E0",
          borderRadius: "8px",
          margin: "10px"
        }}
      >
        <DataTable />
      </div>
    </>
  );
}

export default App;
