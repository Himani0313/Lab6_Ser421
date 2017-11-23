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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launch);

        listView = (ListView) findViewById(R.id.listView);
        output = new ArrayList<>();
        dataModels = new ArrayList();
        choosenCityList = new ArrayList<>();
        
        Intent intent = getIntent();
        Bundle b = intent.getExtras();
        String s = "";
        if(b != null && b.containsKey("Third")) s = (String) b.get("Third");
        ArrayList<String> cities = new ArrayList<>();
        cities.add("Peshawar");
        cities.add("Tempe");
        cities.add("Hyderabad");
        cities.add("Islamabad");
        cities.add("Quetta");
        cities.add("Mumbai");
        cities.add("Delhi");
        cities.add("Chennai");
        cities.add("Kolkata");
        cities.add("Karachi");

        for(String city: cities){
            Log.d("sdf", city);
            if(city.equals(s)){
                Log.d("Chosen Third City", s);
                dataModels.add(new CheckBoxPOJO(city, true, false));
            }else
                dataModels.add(new CheckBoxPOJO(city, false, true));
        }

        adapter = new CustomAdapter(dataModels, getApplicationContext());

        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView parent, View view, int position, long id) {

                CheckBoxPOJO dataModel= (CheckBoxPOJO) dataModels.get(position);
                dataModel.checked = !dataModel.checked;
                Log.d("Changing checked", "" + dataModel.checked);
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
                Log.d("csacs", city.getName());
                sb.append(city.getName()).append(",");
            }
        }
        Toast.makeText(this, sb.toString().split(",").length+"  ",Toast.LENGTH_LONG).show();

        if(sb.toString().split(",").length != 5){
            Toast.makeText(getApplicationContext(),"Select exactly 5 cities",Toast.LENGTH_LONG).show();
        }
        else{
            Intent intent = new Intent(this,MainActivity.class);
            //sb.append(output.indexOf())
            intent.putExtra("Output",sb.substring(0, sb.length()-1).toString());

            startActivity(intent);
        }

    }

}
