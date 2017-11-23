package com.example.himanishah.webviewsamples;


import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebStorage;
import android.webkit.WebView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    WebView browser;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent intent = getIntent();
        Bundle b = intent.getExtras();
        String s = (String) b.get("Output");
        //WebView Object
        browser = (WebView)findViewById(R.id.webViewDisplay);
        browser.setHorizontalScrollBarEnabled(true);
        browser.setVerticalScrollBarEnabled(true);
        browser.setWebContentsDebuggingEnabled(true);

        WebSettings settings = browser.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        browser.loadUrl(getString(R.string.wvURL)+"?"+s);
        Log.d("ssxsx",getString(R.string.wvURL)+"?"+s);
    }

    @Override
    public void onBackPressed() {
        //super.onBackPressed();
        Log.d("xsxs",browser.getUrl().split("[?]")[1]);
        Intent intent = new Intent(this,LaunchActivity.class);
        intent.putExtra("Third",browser.getUrl().split("[?]")[1]);
        startActivity(intent);
    }
}
