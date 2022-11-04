package elec5619.group2.healthier.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import elec5619.group2.healthier.model.User;

import java.io.UnsupportedEncodingException;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET = "ELEC5619G2";

    //generate json web token based on userID
    public static String getToken(User user) {
        String token = "";

        //Check input
        if (user == null){
            return token;
        }

        //Set expiry date
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        long expMillis = nowMillis + 10000000;
        Date expDate = new Date(expMillis);

        //Generate jwt token with signature and userID as audience
        try {
            token = JWT.create()
                    .withAudience(user.getUser_id()+"")
                    .withIssuedAt(now)
                    .withExpiresAt(expDate)
                    .sign(Algorithm.HMAC256(SECRET));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return token;
    }

    //Extract content from token
    public static String verifyToken(String token) {
        DecodedJWT jwt = null;
        try {
            //Extract content
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
            jwt = verifier.verify(token);
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        //return token audience as userID
        return jwt.getAudience().get(0);
    }

    //Validate token with given userID
    public static String validateUser(String userID, String token){
        //Check null and empty inputs
        if (userID == null || token == null || userID.equals("") || token.equals("")){
            return "Login first";
        }

        try {
            //Validate token through its content and expiry date
            String check = JwtUtil.verifyToken(token);

            //Failed validation
            if (check.equals(userID) == false) {
                return "Session timeout. Please login again!!!";
            }
            return "success";
        }
        catch (Exception e) {
            e.printStackTrace();
            return "Session timeout. Please login again!!!";
        }
    }
}
