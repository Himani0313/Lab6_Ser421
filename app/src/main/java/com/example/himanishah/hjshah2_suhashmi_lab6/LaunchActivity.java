package com.example.himanishah.hjshah2_suhashmi_lab6;

import android.content.Intent;
import android.location.LocationManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;

public class LaunchActivity extends AppCompatActivity {

    ArrayList dataModels;
    ListView listView;
    private CustomAdapter adapter;
    ArrayList<CheckBoxPOJO> output;
    ArrayList<String> choosenCityList;
    String chosenCity = "";
    StringBuilder sb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launch);

        listView = (ListView) findViewById(R.id.listView);
        sb = new StringBuilder();
        output = new ArrayList<>();
        dataModels = new ArrayList();
        ArrayList<String> cities = new ArrayList<>();
        cities.add("Denver");
        cities.add("Miami");
        cities.add("Chicago");
        cities.add("Houston");
        cities.add("Philadelphia");
        cities.add("Dallas");
        cities.add("Tempe");
        cities.add("Seattle");
        cities.add("Washington");
        cities.add("Austin");

        Intent intent = getIntent();
        Bundle b = intent.getExtras();

        String s = "";
        choosenCityList = new ArrayList<>();

        if (b != null && b.containsKey("Third")) {
            Log.d("THIRD", b.get("Third").toString());
            s = (String) b.get("Third");
            chosenCity = s.split("&")[0];
            for (String citi : s.split("&")[1].split(",")) {
                Log.d("Chosen", citi);
                choosenCityList.add(citi);
            }
        } else {
            choosenCityList.add("Denver");
            choosenCityList.add("Miami");
            choosenCityList.add("Chicago");
            choosenCityList.add("Houston");
            choosenCityList.add("Philadelphia");
        }
        for(int i = 0; i < 5; i++)
            sb.append(choosenCityList.get(i)).append(",");



        for (String city : cities) {
            if (city.equals(chosenCity)) {
                Log.d("Chosen Third City", city);
                dataModels.add(new CheckBoxPOJO(city, true, true));
            } else {
                if (choosenCityList.contains(city)) {
                    dataModels.add(new CheckBoxPOJO(city, true, false));
                    Log.d("Chosen city: ", city);
                } else {
                    Log.d("Bekaar city: ", city);
                    dataModels.add(new CheckBoxPOJO(city, false, false));
                }
            }
        }

        adapter = new CustomAdapter(dataModels, getApplicationContext());

        listView.setAdapter(adapter);
        Log.d("ONCREATE SB", sb.toString());

    }

    public void changeButtonClicked(View v) {
        sb = new StringBuilder();
        ArrayList<CheckBoxPOJO> cityList = dataModels;
        Log.d("CHOSING BEFORE CHANGE", chosenCity);

        for (int i = 0; i < cityList.size(); i++) {
            CheckBoxPOJO city = cityList.get(i);
            Log.d("chosing city", city.getName() + " " + city.isChecked() + " " + city.isFixed());
            if (city.isChecked()) {
                if (chosenCity.equals("")) {
                    chosenCity = city.getName();
                    Log.d("CHOSING ON CHANGE", chosenCity);
                }
                Log.d("bbb", city.getName());
                sb.append(city.getName()).append(",");
            }
        }
        Log.d("Cities", sb.toString());
    }

    public void showWebViewButtonClicked(View v) {
        
        if(sb.toString().split(",").length != 5){
            Toast.makeText(getApplicationContext(),"Select exactly 5 cities",Toast.LENGTH_LONG).show();
        }
        else{
            Intent intent = new Intent(this,MainActivity.class);
            //sb.append(output.indexOf())
            if(chosenCity.equals("")){
                chosenCity = sb.toString().split(",")[0];
            }
            intent.putExtra("Output",chosenCity + "&" + sb.substring(0, sb.length()-1).toString());

            startActivity(intent);
        }

    }

}
