package gray.website.api;

import gray.bingo.common.entity.BingoPageRsp;
import gray.website.common.config.AccessToken;
import gray.website.common.entity.User;
import gray.website.common.qry.UserPageQry;

public interface UserService {

    User login(String name,String password);

    User getUserFromToken(String token);

    void cacheUserWithToken(String newToken, User loginUser);

    void logout();

    BingoPageRsp<User> page(UserPageQry userPageQry);

    User current();

    User register(String username, String password);

    AccessToken check();
}
