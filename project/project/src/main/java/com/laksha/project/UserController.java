package com.laksha.project; // Correct package statement at the top
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api") // Optionally, you can group your routes under a base path
public class UserController {

    private final UserRepository userRepository;

    // Constructor Injection of the UserRepositorymvn clean install

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Endpoint to create a new user
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@RequestBody User user) {  // Fixed typo @RequetsBody -> @RequestBody
        System.out.println("Received User: " + user.getName());
        System.out.println("Received Password: " + user.getPassword());
        userRepository.save(user);
        return ResponseEntity.ok("User created successfully!");
    }

    // Endpoint to get all users
    @GetMapping("/all")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}


