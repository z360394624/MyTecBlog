package com.reactnative.lib;

import android.text.TextUtils;
import android.util.Log;

import com.facebook.quicklog.identifiers.ReactNativeBridge;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactnative.JSONUtil;
import com.reactnative.bean.RNObject;

/**
 * Created by luciuszhang on 17-8-13.
 */

public class RNBridge extends ReactContextBaseJavaModule {

    public static final String TAG = RNBridge.class.getName();

    public static final String MSG_FINISH_ACTIVITY = "finishActivity";


    public static final String EVENT_NAME_DYNAMIC_TEXT_VALUE = "event_namr_to_value";

    private ReactApplicationContext mReactContext;


    public RNBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNBridge";
    }


    @ReactMethod
    public void handleMessage(String message) {
        if (TextUtils.isEmpty(message)) {
            Log.d(TAG, "handlerMessage is null ");
            return;
        }
        Log.d(TAG, "message = " + message);
        if (MSG_FINISH_ACTIVITY.equals(message)) {
            getCurrentActivity().finish();
        }

    }

    public void sendMessage(RNObject message) {
        if (message == null) {
            Log.d(TAG, "message cna not be null");
            return;
        }
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(EVENT_NAME_DYNAMIC_TEXT_VALUE, JSONUtil.toJSON(message));
    }

    public void finish() {
        getCurrentActivity().finish();
    }
}
