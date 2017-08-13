package com.mytecblog;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.Button;

import com.facebook.react.ReactActivity;
import com.reactnative.lib.RNMainActivity;

public class MainActivity extends Activity {

    private Button mToRNActivity;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mToRNActivity = (Button) findViewById(R.id.btn_jump_to_rn);
        mToRNActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, RNMainActivity.class);
                startActivity(intent);
            }
        });
    }
}
