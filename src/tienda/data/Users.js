const USERS_KEY = "users";

const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const createUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

//cuando admin este en desarrollo, añadir eliminar por.. correo y usuario? supongo o solo por correo, y tambier buscar usuario