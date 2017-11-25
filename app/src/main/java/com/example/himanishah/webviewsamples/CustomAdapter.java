package com.example.himanishah.webviewsamples;

/**
 * Created by dhruvinpatel on 11/23/17.
 */

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;


public class CustomAdapter extends ArrayAdapter{
    private ArrayList dataSet;
    Context mContext;
    HashMap<String,String> hm;

    // View lookup cache
    private static class ViewHolder {
        TextView txtName;
        CheckBox checkBox;
        Button infoButton;
    }

    public CustomAdapter(ArrayList data, Context context) {
        super(context, R.layout.row_item, data);
        this.dataSet = data;
        this.mContext = context;
        hm=new HashMap<String, String>();
        // 'Denver','Miami','Chicago','Houston','Philadelphia','Dallas','Tempe','Seattle','Washington','Austin'
        hm.put("Denver","http://www.city-data.com/city/Denver-Colorado.html");
        hm.put("Miami","http://www.city-data.com/city/Miami-Florida.html");
        hm.put("Chicago","http://www.city-data.com/city/Chicago-Illinois.html");
        hm.put("Houston","http://www.city-data.com/city/Houston-Texas.html");
        hm.put("Philadelphia","http://www.city-data.com/city/Philadelphia-Pennsylvania.html");
        hm.put("Dallas","http://www.city-data.com/city/Dallas-Texas.html");
        hm.put("Tempe","http://www.city-data.com/city/Tempe-Arizona.html");
        hm.put("Seattle","http://www.city-data.com/city/Seattle-Washington.html");
        hm.put("Washington","http://www.city-data.com/city/Washington-District-of-Columbia.html");
        hm.put("Austin","http://www.city-data.com/city/Austin-Texas.html");
    }
    @Override
    public int getCount() {
        return dataSet.size();
    }

    @Override
    public CheckBoxPOJO getItem(int position) {
        return (CheckBoxPOJO) dataSet.get(position);
    }


    @Override
    public View getView(int position, View convertView, @NonNull ViewGroup parent) {

        ViewHolder viewHolder;
        final View result;

        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_item, parent, false);
            viewHolder.txtName = (TextView) convertView.findViewById(R.id.txtName);
            viewHolder.checkBox = (CheckBox) convertView.findViewById(R.id.checkBox);
            viewHolder.infoButton = (Button) convertView.findViewById(R.id.buttonInfo);
            result=convertView;
            convertView.setTag(viewHolder);

        } else {
            viewHolder = (ViewHolder) convertView.getTag();
            result=convertView;
        }

        final CheckBoxPOJO item = getItem(position);

        viewHolder.txtName.setText(item.name);
        viewHolder.checkBox.setChecked(item.checked);
        viewHolder.checkBox.setEnabled(!item.isFixed);

        viewHolder.checkBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(!item.isFixed()) item.checked = !item.checked;
            }
        });

        viewHolder.infoButton.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
//                Toast.makeText(getContext(),hm.get(item.getName()) + " Selected",Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(mContext,InfoActivity.class);
                intent.putExtra("url",hm.get(item.getName()));
                mContext.startActivity(intent);
            }

        });
        return result;
    }

}