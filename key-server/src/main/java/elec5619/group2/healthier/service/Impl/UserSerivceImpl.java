package elec5619.group2.healthier.service.Impl;

//import static org.hamcrest.CoreMatchers.nullValue;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import elec5619.group2.healthier.util.CheckUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import elec5619.group2.healthier.model.User;
import elec5619.group2.healthier.model.dao.UserDao;
import elec5619.group2.healthier.service.UserService;

@Service
public class UserSerivceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	//Update user
	@Override
	public boolean updateUser(User user) {
		//Validate inputs
		if (user == null){
			return false;
		}


		try{
			userDao.save(user);
		}
		catch (Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}

	//Select user by userID
	@Override
	public User selectOneUser(User user) {
		if (user == null){
			return null;
		}
		Optional<User> users = userDao.findById(user.getUser_id());
		if (users.isPresent()){
			return users.get();
		}
		return null;
	}

	//Select user by username
	@Override
	public User selectOneUser_forname(User user) {
		if (user == null || user.getUsername() == null){
			return null;
		}

		List<User> users = userDao.findByUsername(user.getUsername());
		if (users.size() == 0){
			return null;
		}
		return (User) users.get(0);
	}

	//Compare user password
	@Override
	public boolean comparePassword(User user, User userCheck){
		//Input check
		if (user == null || userCheck == null){
			return false;
		}

		//Compare password
		String userPassword = user.getPassword();
		String userCheckPassword = userCheck.getPassword();
		if (userPassword == null || userCheckPassword == null){
			return false;
		}

		return user.getPassword().equals(userCheck.getPassword());
	}
}
