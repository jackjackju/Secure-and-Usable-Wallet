package elec5619.group2.healthier.service;

import elec5619.group2.healthier.model.User;

public interface UserService {
	boolean updateUser(User user);
	User selectOneUser(User user);
	User selectOneUser_forname(User user);
	boolean comparePassword(User user, User userCheck);
}
