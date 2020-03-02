package com.yamigu.yamigu_app;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import com.rnfs.RNFSPackage; 
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts; 

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new RNFirebaseAuthPackage());
          packages.add(new RNFirebaseDatabasePackage());
          packages.add(new RNFirebaseMessagingPackage());
          packages.add(new RNFirebaseNotificationsPackage());
          // packages.add(new ReactNativeContacts());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    getHashKey();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }
  private void getHashKey(){
    PackageInfo packageInfo = null;
    try {
        packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
        e.printStackTrace();
    }
    if (packageInfo == null)
        Log.e("KeyHash", "KeyHash:null");

    for (Signature signature : packageInfo.signatures) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA");
            md.update(signature.toByteArray());
            Log.d("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
        } catch (NoSuchAlgorithmException e) {
            Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
        }
    }
}


  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
