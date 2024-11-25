package gray.website.common.biz;

import gray.bingo.common.exceptions.BingoException;
import lombok.Getter;

public class BIZException extends BingoException {



    public BIZException(BIZErrorCodeEnum errorCodeEnum) {
        super(errorCodeEnum);
    }

    public String toString() {
        return "BIZException{ code : " + this.getCode() + ", message : " + this.getMessage() + "}";
    }
}
