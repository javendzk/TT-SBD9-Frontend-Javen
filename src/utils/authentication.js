export const saveUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const getUser = () => {
  const userJSON = localStorage.getItem('user');
  return userJSON ? JSON.parse(userJSON) : null;
};

export const getUserId = () => {
  const user = getUser();
  return user ? user.id : null;
};

export const isLoggedIn = () => {
  return !!getUser();
};

export const removeUser = () => {
  localStorage.removeItem('user');
};