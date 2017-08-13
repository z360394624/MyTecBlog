package com.reactnative.lib;

import android.content.pm.PackageManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

import javax.annotation.Nullable;

public class RNMainActivity extends ReactActivity {


    @Nullable
    @Override
    protected String getMainComponentName() {
        return "MyTecBlog";
    }



}
