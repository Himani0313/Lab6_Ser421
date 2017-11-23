package com.example.himanishah.webviewsamples;


import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //WebView Object
        WebView browser = (WebView)findViewById(R.id.webViewDisplay);
        browser.setHorizontalScrollBarEnabled(true);
        browser.setVerticalScrollBarEnabled(true);
        browser.setWebContentsDebuggingEnabled(true);
        browser.getSettings().setJavaScriptEnabled(true);
        browser.loadUrl(getString(R.string.wvURL));
    }
}
