package elec5619.group2.healthier.controller;

import elec5619.group2.healthier.service.UserService;
import elec5619.group2.healthier.util.JwtUtil;
import elec5619.group2.healthier.util.PasswordUtil;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import elec5619.group2.healthier.model.*;

//Controller for Login and Signup functions
@RestController
@RequestMapping(path = "/api", produces = "application/json")
public class LoginController {
    @Autowired
    private UserService userService;

    //Login router
    @PostMapping("/login")
    public String login(@RequestBody User user) throws JSONException {
        User userCheck = userService.selectOneUser_forname(user);
        JSONObject json = new JSONObject();

        //Find user in database
        if (userCheck == null){
            json.put("message", "User Not Found or Incorrect Password");
        }
        //Password check
        else if (!userService.comparePassword(user, userCheck)){
            json.put("message", "User Not Found or Incorrect Password");
        }
        else{
            //Generate token and send back userID and token
            String jwtToken = JwtUtil.getToken(userCheck);
            json.put("message", "Successfully login");
            json.put("token", jwtToken);
            json.put("username", userService.selectOneUser_forname(user).getUsername());
            json.put("secret", userService.selectOneUser_forname(user).getSecret());
        }
        return json.toString();
    }

    @PostMapping("/ibropf")
    public String ibropf(@RequestBody User user) throws JSONException {
        JSONObject json = new JSONObject();

        json.put("message", "Successfully generated");
        json.put("username", userService.selectOneUser_forname(user).getUsername());
        json.put("pwd", PasswordUtil.getPwd(user.getPassword()));
        return json.toString();
    }

    @PostMapping("/secret")
    public String secret(@RequestBody User user) throws JSONException {
        JSONObject json = new JSONObject();
        User userCheck = userService.selectOneUser_forname(user);
        userCheck.setSecret(user.getSecret());
        userService.updateUser(user);
        json.put("message", "Successfully updated");
        return json.toString();
    }

    //Signup router
    @PostMapping("/register")
    public String signup(@RequestBody User user) throws JSONException {
        JSONObject json = new JSONObject();

        //Check user inputs
        if (user.getUsername() == null || user.getUsername().equals("") || user.getPassword() == null || user.getPassword().equals("")){
            json.put("message", "Invalid Username or Password");
            return json.toString();
        }

        //Find user in database
        User userCheck = userService.selectOneUser_forname(user);
        if (userCheck != null){
            json.put("message", "User exists");
            return json.toString();
        }
        else{
            //add user to database
            user.setPassword(PasswordUtil.generatePwd(user.getPassword()));

            if(userService.updateUser(user) == false){
                json.put("message", "Invalid Details for Email/Gender/Password");
                return json.toString();
            }

            //return response with token and userID
            String jwtToken = JwtUtil.getToken(user);
            json.put("message", "Successfully signup");
            json.put("token", jwtToken);
            json.put("username", userService.selectOneUser_forname(user).getUsername());
            json.put("pwd", userService.selectOneUser_forname(user).getPassword());
        }
        return json.toString();
    }
}
