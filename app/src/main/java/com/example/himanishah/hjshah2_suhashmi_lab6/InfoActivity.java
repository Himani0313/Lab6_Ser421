package com.example.himanishah.hjshah2_suhashmi_lab6;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class InfoActivity extends AppCompatActivity {
    WebView browser;
    String url;
    String cityName;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info);
        Intent intent = getIntent();
        Bundle b = intent.getExtras();
        url = (String) b.get("url");
        cityName = (String) b.get("cityName");
        this.setTitle(cityName);
        browser = (WebView)findViewById(R.id.infoWebView);
        browser.setHorizontalScrollBarEnabled(true);
        browser.setVerticalScrollBarEnabled(true);
        browser.setWebContentsDebuggingEnabled(true);

        WebSettings settings = browser.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        browser.setWebViewClient(new WebViewClient(){
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return true;
            }
        });
        browser.loadUrl(url);

    }

}
