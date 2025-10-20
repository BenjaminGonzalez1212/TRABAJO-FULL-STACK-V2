const USERS_KEY = "users";

export const getUsers = () => {
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

export const findUser = (email, password) => {
    const users = getUsers();
    return users.find((u) => u.email === email && u.password === password);
};

//cuando admin este en desarrollo, añadir eliminar por.. correo y usuario? supongo o solo por correo, y tambier buscar usuario 