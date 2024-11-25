package gray.website.adapter.config;

import gray.bingo.common.Enums.BingoExceptionInfoEnum;
import gray.bingo.common.entity.R;
import gray.bingo.common.exceptions.BingoException;
import gray.bingo.common.utils.ExceptionUtil;
import gray.website.common.biz.BIZErrorCodeEnum;
import gray.website.common.biz.BIZException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常统一处理切面
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {


    /**
     * bingo框架异常统一处理
     *
     * @param e
     * @return
     */
    @ExceptionHandler({BingoException.class})
    public R<?> bingo(BingoException e) {
        log.error(ExceptionUtil.getMessage(e));
        return R.error(BingoExceptionInfoEnum.BINGO_ERROR.getCode(), e.getMessage());
    }

    /**
     * 业务异常统一处理
     *
     * @param e
     * @return
     */
    @ExceptionHandler({BIZException.class})
    public R<?> biz(BIZException e) {
        log.error(ExceptionUtil.getMessage(e));
        return R.error(e.getCode(), e.getMessage());
    }

    /**
     * 未知异常统一处理
     *
     * @param e
     * @return
     */
    @ExceptionHandler({Exception.class})
    public R<?> unknown(Exception e) {
        log.error(ExceptionUtil.getMessage(e));
        return R.error(BIZErrorCodeEnum.UNKNOWN_ERROR.getCode(), e.getMessage());
    }

}
