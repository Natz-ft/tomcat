package com.inspur.ucweb.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import org.apache.log4j.Logger;


public class SecurityUtil {

	private static Logger log = Logger.getLogger(SecurityUtil.class);
	
	//密钥文件路径
	private static String aes_key_path = "aes.key";
	
	//加载密钥文件
	private static SecretKey privateKey = null;
	static{
		ObjectInputStream ois = null;
		try {
			InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(aes_key_path);
			ois = new ObjectInputStream(inputStream);
			privateKey = (SecretKey) ois.readObject();
		} catch (IOException e) {
			log.error("", e);
		} catch (ClassNotFoundException e) {
			log.error("", e);
		}finally{
			if(ois != null){
				try {
					ois.close();
				} catch (IOException e) {
					log.error("", e);
				}
			}
		}
	}
	public static String encode(String content, SecretKey key){
		try {
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.ENCRYPT_MODE,key );
			byte[] b = cipher.doFinal(content.getBytes("utf-8"));
			return Base64.encodeBytes(b);
		} catch (Exception e) {
			log.error("", e);
		}
		return null;
	}
	private static String decode(String miwen, SecretKey key){
		try {
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.DECRYPT_MODE, key);
			String res = new String(cipher.doFinal(Base64.decode(miwen)),"utf-8");
			return res;
		} catch (NoSuchAlgorithmException e) {
			log.error("", e);
		} catch (NoSuchPaddingException e) {
			log.error("", e);
		} catch (InvalidKeyException e) {
			log.error("", e);
		} catch (UnsupportedEncodingException e) {
			log.error("", e);
		} catch (IllegalBlockSizeException e) {
			log.error("", e);
		} catch (BadPaddingException e) {
			log.error("", e);
		}
		return miwen;
	}
	/**
	 * 加密，仅供加密cookie和Saml令牌使用
	 * @param content
	 * @return
	 */
	public static String jiami(String content){
		return encode(content,privateKey);
	}
	/**
	 * 解密，仅供解密cookie和Saml令牌使用
	 * @param miwen
	 * @return
	 */
	public static String jiemi(String miwen){
		return decode(miwen,privateKey);
	}
	/**
	 * md5
	 * @return String
	 */
	public static String md5(String plainText){
		if(plainText == null)
			plainText = "";
		byte[] temp = plainText.getBytes();
		MessageDigest md;
		// 返回结果
		StringBuffer buffer = new StringBuffer();
		try {
			// 进行MD5散列
			md = MessageDigest.getInstance("md5");
			md.update(temp);
			temp = md.digest();
			// 将散列的结果转换为Hex字符串
			int i = 0;
			for (int offset = 0; offset < temp.length; offset++) {
				i = temp[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buffer.append("0");
				buffer.append(Integer.toHexString(i));
			}
		} catch (GeneralSecurityException e) {
			log.error("",e);
		}
		// 返回
		return buffer.toString();
	}
	
	/**
	 * 老的解密算法，兼容php版本
	 * @param $txt
	 * @return
	 */
	public static String jiemiOld(String $txt){
		
		String $key = "icity365";
		String $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=_";
		String $ch = $txt.substring(0, 1);
		int $nh = $chars.indexOf($ch );
		String $mdKey = md5( $key + $ch );
		$mdKey = $mdKey.substring($nh % 8,$nh % 8+$nh % 8+7);//$nh % 8,$nh % 8+$nh % 8+7
		$txt = $txt.substring(1);
		char[] $txt2 = $txt.toCharArray();
		char[] $mdKey2 = $mdKey.toCharArray();
		char[] $chars2 = $chars.toCharArray();
		String $tmp = "";
		int $i = 0;
		int $j = 0;
		int $k = 0;
		for($i = 0; $i < $txt.length(); $i ++) {
			$k = $k == $mdKey.length() ? 0 : $k;
			$j = $chars.indexOf($txt2 [$i]) - $nh - (int)( $mdKey2 [$k ++] );
			while ( $j < 0 ){
				$j += 64;
			}
			$tmp += $chars2 [$j];
		}
		return new String(Base64.decode($tmp));
	}
	/**
	 * 老的加密算法，兼容php版本
	 * @param $txt
	 * @return
	 */
	public static String jiamiOld(String $txt) {
		String $key = "icity365";
		String $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=_";
		Random r = new Random();
		int $nh = r.nextInt(64);
		char chars_aray[] = $chars.toCharArray();
		char $ch = chars_aray[$nh];
		String $mdKey = md5 ( $key + $ch );
		$mdKey = $mdKey.substring($nh % 8, $nh % 8+$nh % 8 + 7 );
		$txt = Base64.encodeBytes($txt.getBytes());
		$txt = $txt.replace("\n", "");
		$txt = $txt.replace("\r", "");
		char $txt_array[] = $txt.toCharArray();
		char $mdKey_array[] = $mdKey.toCharArray();
		String $tmp = "";
		int $i = 0;
		int $j = 0;
		int $k = 0;
		for($i = 0; $i < $txt.length(); $i ++) {
			$k = $k == $mdKey.length() ? 0 : $k;
			$j = ($nh + $chars.indexOf($txt_array [$i]) + (int)( $mdKey_array [$k ++] )) % 64;
			$tmp = $tmp + chars_aray[$j];
		}
		return $ch + $tmp;
	}
}
