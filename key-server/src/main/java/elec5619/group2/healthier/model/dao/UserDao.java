package elec5619.group2.healthier.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import elec5619.group2.healthier.model.User;

public interface UserDao extends JpaRepository<User, Integer> {

	public List<User> findByUsername(String Username);
}
