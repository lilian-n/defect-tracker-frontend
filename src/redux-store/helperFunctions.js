export const getUserName = (userArray, userId) => {
  const foundUser = userArray.find(u => u.id === userId);
  if (!foundUser) {
    return ""
  }
  return foundUser.name;
}