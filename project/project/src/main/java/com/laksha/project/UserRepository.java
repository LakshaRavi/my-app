package com.laksha.project; // Assuming the project package is 'com.laksha.project'

import com.laksha.project.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods here if needed
    User findByEmail(String email); // Example: Find a user by email
}

