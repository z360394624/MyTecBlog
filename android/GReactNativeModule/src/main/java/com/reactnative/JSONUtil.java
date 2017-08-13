package com.reactnative;

import com.alibaba.fastjson.JSON;

import java.util.Objects;

/**
 * Created by luciuszhang on 17-8-13.
 */

public class JSONUtil {

    public static String toJSON(Object object) {
        return JSON.toJSONString(object);
    }
}
