package elec5619.group2.healthier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(scanBasePackages="elec5619.group2.healthier")
@EntityScan("elec5619.group2.healthier.model")
@EnableJpaRepositories("elec5619.group2.healthier.model.dao")
@RestController
public class HealthierApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthierApplication.class, args);
		System.out.println("Server starts listening on port 8080");
	}
}
