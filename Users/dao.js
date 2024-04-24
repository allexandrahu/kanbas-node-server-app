import model from "./model.js";
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const findAllUsers = () => model.find();
export const createUser = (user) => model.create(user);

export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUserById = (userId) => model.findById({id: userId});
export const findUsersByRole = (role) => model.find({ role: role });
export const findUserByUsername = (username) => model.findOne({ username: username });