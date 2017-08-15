package com.reactnative.lib;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactnative.bean.DemoBean;
import com.reactnative.utils.FileUtil;
import com.reactnative.utils.JSONUtil;
import com.reactnative.bean.RNObject;

import java.io.File;

/**
 * Created by luciuszhang on 17-8-13.
 *
 * @detail maybe modify this class as singleton
 */
public class RNBridge extends ReactContextBaseJavaModule {

    public static final String TAG = RNBridge.class.getName();

    public static final String MSG_FINISH_ACTIVITY = "finishActivity";
    public static final String MSG_CALL_CAMERA = "callCamera";
    public static final String MSG_SEND_PHOTO_FROM_CAMERA = "sendPhotoFromCamera";
    public static final String MSG_SEND_PHOTO_FROM_ALBUM = "sendPhotoFromAlbum";
    public static final String MES_SHOW_ALBUM = "showAlbum";

    public static final int REQUEST_CODE_CAMERA = 1000;
    public static final int REQUEST_CODE_ALBUM = 1001;


    private static final String RN_IMAGE_FILE_NAME = "rn-camera";
    private static final String IMAGE_PATH_PREFIX = Environment.getExternalStorageDirectory().getAbsolutePath()
            + File.separator + RN_IMAGE_FILE_NAME;

    private ReactApplicationContext mReactContext;
    private Uri mUri;

    public RNBridge(final ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
        this.mReactContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                Log.d(TAG, "activityName = " + activity.getLocalClassName() + "; requestCode = " + requestCode + "; resultCode = " + resultCode);
                if (REQUEST_CODE_CAMERA == requestCode && Activity.RESULT_OK == resultCode) {
                    Log.d(TAG, "uri = " + data.getData());
                    DemoBean demoBean = new DemoBean();
                    demoBean.setImagePath(mUri.getPath());
                    demoBean.setMsgType(MSG_SEND_PHOTO_FROM_CAMERA);
                    sendMessage(demoBean);
                } else if (REQUEST_CODE_ALBUM == requestCode && Activity.RESULT_OK == resultCode) {
                    Uri selectedImage = data.getData();
                    String[] filePathColumns = {MediaStore.Images.Media.DATA};
                    Cursor c = getCurrentActivity().getContentResolver().query(selectedImage, filePathColumns, null, null, null);
                    c.moveToFirst();
                    int columnIndex = c.getColumnIndex(filePathColumns[0]);
                    String imagePath = c.getString(columnIndex);
                    mUri = Uri.fromFile(new File(imagePath));
                    Log.d(TAG, "imagePath = " + mUri.toString());
                    DemoBean demoBean = new DemoBean();
                    demoBean.setImagePath(mUri.getPath());
                    demoBean.setMsgType(MSG_SEND_PHOTO_FROM_ALBUM);
                    sendMessage(demoBean);
                    c.close();
                }
            }
        });
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
        } else if (MSG_CALL_CAMERA.equals(message)) {
            callCamera();
        } else if (MES_SHOW_ALBUM.equals(message)) {
            showAlbum();
        }

    }

    public void sendMessage(final RNObject message) {
        if (message == null) {
            Log.d(TAG, "message cna not be null");
            return;
        }
        System.out.println("mReactContext=" + mReactContext);

        final String messageData = JSONUtil.toJSON(message);
        Log.d(TAG, "messageData = " + messageData);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                final DeviceEventManagerModule.RCTDeviceEventEmitter emitter =
                        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
                Log.d(TAG, "emitter = " + emitter);
                emitter.emit(message.getMsgType(), messageData);
            }
        }, 50);


    }

    private void callCamera() {
        FileUtil.checkDirExistsIfCreate(IMAGE_PATH_PREFIX);
        String imagePath = IMAGE_PATH_PREFIX + File.separator + System.currentTimeMillis() + ".jpeg";
        mUri = Uri.fromFile(new File(imagePath));
        Log.d(TAG, "imagePath = " + mUri.toString());
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);//启动相机的intent
        intent.putExtra(MediaStore.EXTRA_OUTPUT, mUri);
        getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_CAMERA);
    }

    private void showAlbum() {
        Intent intent = new Intent(Intent.ACTION_PICK,
                android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_ALBUM);
    }


}
