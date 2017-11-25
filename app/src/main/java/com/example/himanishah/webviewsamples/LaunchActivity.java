package com.example.himanishah.webviewsamples;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
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
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launch);

        listView = (ListView) findViewById(R.id.listView);
        output = new ArrayList<>();
        dataModels = new ArrayList();

        Intent intent = getIntent();
        Bundle b = intent.getExtras();
        String s = "";
        choosenCityList = new ArrayList<>();

        if(b != null && b.containsKey("Third")){
            s = (String) b.get("Third");
            chosenCity = s.split("&")[0];
            for(String citi: s.split("&")[1].split(",")){
                choosenCityList.add(citi);
            }
        }
        else{
            choosenCityList.add("Denver");
            choosenCityList.add("Miami");
            choosenCityList.add("Chicago");
            choosenCityList.add("Houston");
            choosenCityList.add("Philadelphia");
        }

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

        for(String city: cities){
            if(city.equals(chosenCity)){
                Log.d("Chosen Third City", city);
                dataModels.add(new CheckBoxPOJO(city, true, true));
            }else{
                if(choosenCityList.contains(city)){
                    dataModels.add(new CheckBoxPOJO(city, true, false));
                    Log.d("Chosen city: ",city);
                }else{
                    Log.d("Bekaar city: ",city);
                    dataModels.add(new CheckBoxPOJO(city, false, false));
                }
            }
        }

        adapter = new CustomAdapter(dataModels, getApplicationContext());

        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView parent, View view, int position, long id) {
                CheckBoxPOJO dataModel= (CheckBoxPOJO) dataModels.get(position);
                if(!dataModel.isFixed()) dataModel.checked = !dataModel.checked;
                adapter.notifyDataSetChanged();
            }
        });


    }
    public void changeButtonClicked(View v){
        ArrayList<CheckBoxPOJO> cityList = dataModels;
        for(int i=0;i<cityList.size();i++){
            CheckBoxPOJO city = cityList.get(i);
            if(city.isChecked()){
                output.add(city);
                Log.d("csacs",city.getName());
            }
        }

    }
    public void showWebViewButtonClicked(View v){
        StringBuilder sb = new StringBuilder();
        ArrayList<CheckBoxPOJO> cityList = dataModels;
        for(int i=0;i<cityList.size();i++) {
            CheckBoxPOJO city = cityList.get(i);
            Log.d("csacs", city.getName() + " " + city.isChecked() + " " + city.isFixed());
            if (city.isChecked()) {
                Log.d("bbb", city.getName());
                sb.append(city.getName()).append(",");
            }
        }
//        Toast.makeText(this, sb.toString().split(",").length+"  ",Toast.LENGTH_LONG).show();

        if(sb.toString().split(",").length != 5){
            Toast.makeText(getApplicationContext(),"Select exactly 5 cities",Toast.LENGTH_LONG).show();
        }
        else{
            Intent intent = new Intent(this,MainActivity.class);
            //sb.append(output.indexOf())
            intent.putExtra("Output",chosenCity + "&" + sb.substring(0, sb.length()-1).toString());

            startActivity(intent);
        }

    }

}
