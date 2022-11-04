package elec5619.group2.healthier.util;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import net.sf.json.JSONObject;
import okhttp3.*;

public class CheckUtil {

	 //Test email input
	 public static boolean emailCheck(String email) {
		//Empty and null inputs check
//		if (email == null || email.equals("")){
//			return false;
//		}
//
//		//Normal input check
//		String str = "^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\.][A-Za-z]{2,3}([\\.][A-Za-z]{2})?$";
//		Pattern p = Pattern.compile(str);
//		Matcher m = p.matcher(email);
//		return m.matches();
		 return true;
	 }

	 //Test gender input
	 public static boolean genderCheck(String gender) {
		 //Empty and null inputs check
		 if (gender == null || gender.equals("")){
			 return false;
		 }
		 //Normal input check
		 if (gender.equals("male") || gender.equals("female")) {
			return true;
		 }
		 else {
			return false;
		 }
	}
}
