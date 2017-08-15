package com.reactnative.lib;

import android.os.PersistableBundle;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

import javax.annotation.Nullable;

public class RNMainActivity extends ReactActivity {



    @Override
    public void onCreate(@android.support.annotation.Nullable Bundle savedInstanceState, @android.support.annotation.Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);

    }

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "MyTecBlog";
    }



}
