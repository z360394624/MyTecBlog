package com.reactnative.bean;

/**
 * Created by luciuszhang on 17-8-13.
 */

public class DemoBean extends RNObject {

    private String message;

    private String imagePath;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
