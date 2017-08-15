package com.reactnative.utils;

import android.text.TextUtils;

import java.io.File;

/**
 * Created by luciuszhang on 2017/8/14.
 */

public class FileUtil {

    public static void checkDirExistsIfCreate(String path) {
        if (TextUtils.isEmpty(path)) {
            path = "";
        }
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
            file.mkdirs();
        }
    }
}
