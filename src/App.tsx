import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import DataTable from "./components/DataTable/DataTable";
import CreateUserModal from "./components/CreateUserModal/CreateUserModal";

function App({}) {
  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box mt={2} mb={2} display="flex" justifyContent="space-between">
          <h2 style={{margin: '0px'}}>Infinite Loader</h2>
        <Button variant="contained" onClick={toggleModal}>
          Создать пользователя
        </Button>
      </Box>
      <CreateUserModal
        open={open}
        handleCloseModal={toggleModal}
        onCreateUser={toggleModal}
      />
      <div
        style={{
          border: "2px solid #E0E0E0",
          borderRadius: "8px",
          margin: "10px",
        }}
      >
        <DataTable />
      </div>
    </>
  );
}

export default App;
