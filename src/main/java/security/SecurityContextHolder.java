package security;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SecurityContextHolder {
	
	//여기 안에 들어있으면 인증된 객체
	private static List<Authentication> authentications = new ArrayList<>();
	
	public static void addAuth(Authentication authentication) {
		authentications.add(authentication);
	}
	
	public static Boolean isAuthenticated(String token) {
		for(Authentication authentication : authentications) {
			if(Objects.equals(authentication.getToken(), token)) {
				return true;
			}
		}
		return false;
	}
	
	public static Authentication findAuthenticationByToken(String token) {
		for(Authentication authentication : authentications) {
			if(Objects.equals(authentication.getToken(), token)) {
				return authentication;
			}
		}
		return null;
	}

	public static void removeAuth(String token) {
		for(Authentication authentication : authentications) {
			if(Objects.equals(authentication.getToken(), token)) {
				authentications.remove(authentication);
				break;
			}
		}
	}
}
