package gray.website.common.config;

import java.io.Serializable;

public class AuthContext implements Serializable {

    private static final ThreadLocal<AccessToken> AUTH_THREAD_LOCAL = new ThreadLocal<>();

    private static final ThreadLocal<Long> USER_ID = new ThreadLocal<>();

    public static AccessToken get() {
        return AUTH_THREAD_LOCAL.get();
    }

    public static void set(AccessToken accessToken) {
        AUTH_THREAD_LOCAL.set(accessToken);
    }

    public static Long getUserId(){
        return USER_ID.get();
    }

    public static void setUserId(Long userId){
        USER_ID.set(userId);
    }
}
