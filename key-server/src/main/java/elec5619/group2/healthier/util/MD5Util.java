package elec5619.group2.healthier.util;
import java.security.MessageDigest;

public class MD5Util {

    //Hash string with MD5 algorithm
    public static String string2MD5(String inStr){
        if (inStr == null || inStr.equals("")){
            return "";
        }

        MessageDigest md5 = null;
        try{
            md5 = MessageDigest.getInstance("MD5");
        }catch (Exception e){
            System.out.println(e.toString());
            e.printStackTrace();
            return "";
        }
        char[] charArray = inStr.toCharArray();
        byte[] byteArray = new byte[charArray.length];

        for (int i = 0; i < charArray.length; i++) {
            byteArray[i] = (byte) charArray[i];
        }
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (byte md5Byte : md5Bytes) {
            int val = ((int) md5Byte) & 0xff;
            if (val < 16) {
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        return convertMD5(hexValue.toString());

    }

    //Convert string with MD5 algorithm
    public static String convertMD5(String inStr){
        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; i++){
            a[i] = (char) (a[i] ^ 't');
        }
        String s = new String(a);
        return s;
    }

    //Compare string with hashed string
    public static boolean isEqualMD5(String input, String md5forVerify) {
        if (input == null || md5forVerify == null || input.equals("") || md5forVerify.equals("")){
            return false;
        }

		String md5Input = string2MD5(input);
		String uncoverMD5 = convertMD5(md5forVerify);
		if (uncoverMD5.equals(convertMD5(md5Input))) {
			return true;
		}
		else {
			return false;
		}
	}
}
