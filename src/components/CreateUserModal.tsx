import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Grid,
  Typography,
  DialogActions,
} from "@mui/material";
import { createUser } from "../api/api";
import type { User } from "../types/types";
interface CreateUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  onCreateUser: (newUser: User) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  handleCloseModal,
  onCreateUser,
}) => {
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserStreet, setNewUserStreet] = useState<string>("");
  const [newUserPhone, setNewUserPhone] = useState<string>("");
  const [newUserUsername, setNewUserUsername] = useState<string>("");
  const [newUserWebsite, setNewUserWebsite] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPhoneValid =
      /^\d+$/.test(newUserPhone) && newUserPhone.length === 12;
    setPhoneError(!isPhoneValid);

    if (!isPhoneValid) {
      return;
    }

    const newUser: User = {
      name: newUserName,
      email: newUserEmail,
      address: {
        street: newUserStreet,
      },
      phone: newUserPhone,
      username: newUserUsername,
      website: newUserWebsite,
    };

    try {
      await createUser(newUser);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserStreet("");
      setNewUserPhone("");
      setNewUserUsername("");
      setNewUserWebsite("");
      onCreateUser(newUser);
      handleCloseModal();
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="end">
            <Grid item xs={12}>
              <Typography variant="h6">Создание пользователя</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Имя"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Улица"
                value={newUserStreet}
                onChange={(e) => setNewUserStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Номер телефона"
                value={newUserPhone}
                error={phoneError}
                helperText={
                  phoneError
                    ? "Неверный формат номера телефона. Номер должен состоять из 12 цифр."
                    : ""
                }
                onChange={(e) => setNewUserPhone(e.target.value)}
                sx={{ borderColor: phoneError ? "red" : null }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Ник"
                value={newUserUsername}
                onChange={(e) => setNewUserUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Сайт"
                value={newUserWebsite}
                onChange={(e) => setNewUserWebsite(e.target.value)}
              />
            </Grid>
            <DialogActions>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleCloseModal}
              >
                Закрыть
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Создать
              </Button>
            </DialogActions>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
