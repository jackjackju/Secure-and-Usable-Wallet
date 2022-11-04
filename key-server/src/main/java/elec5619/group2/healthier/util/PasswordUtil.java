package elec5619.group2.healthier.util;

public class PasswordUtil {
    private static final String msk = "ibropf";

    public static String getPwd(String password){
        return msk + password + "1";
    }

    public static String generatePwd(String password){
        return msk + password + "2";
    }
}
