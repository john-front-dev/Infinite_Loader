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
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    street: string;
    phone: string;
    username: string;
    website: string;
  }>({
    name: "",
    email: "",
    street: "",
    phone: "",
    username: "",
    website: "",
  });
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPhoneValid =
      /^\d+$/.test(newUser.phone) && newUser.phone.length === 12;
    setPhoneError(!isPhoneValid);

    if (!isPhoneValid) {
      return;
    }

    const userToCreate: User = {
      name: newUser.name,
      email: newUser.email,
      address: {
        street: newUser.street,
      },
      phone: newUser.phone,
      username: newUser.username,
      website: newUser.website,
    };

    try {
      await createUser(userToCreate);
      setNewUser({
        name: "",
        email: "",
        street: "",
        phone: "",
        username: "",
        website: "",
      });
      onCreateUser(userToCreate);
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
                name="name"
                value={newUser.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Улица"
                name="street"
                value={newUser.street}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Номер телефона"
                name="phone"
                value={newUser.phone}
                error={phoneError}
                helperText={
                  phoneError
                    ? "Неверный формат номера телефона. Номер должен состоять из 12 цифр."
                    : ""
                }
                onChange={handleChange}
                sx={{ borderColor: phoneError ? "red" : null }}
                inputProps={{ maxLength: 12 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Ник"
                name="username"
                value={newUser.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Сайт"
                name="website"
                value={newUser.website}
                onChange={handleChange}
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
