const ADMINS_KEY = "admins";

export const getAdmins = () => {
  const admins = localStorage.getItem(ADMINS_KEY);
  return admins ? JSON.parse(admins) : [];
};

const saveAdmins = (admins) => {
  localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
};

export const createAdmin = (admin) => {
  const admins = getAdmins();
  admins.push(admin);
  saveAdmins(admins);
};

export const findAdmin = (email, password) => {
  const admins = getAdmins();
  return admins.find((a) => a.email === email && a.password === password);
};