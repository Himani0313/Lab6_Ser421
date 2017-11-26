package com.example.himanishah.hjshah2_suhashmi_lab6;

/**
 * Created by dhruvinpatel on 11/23/17.
 */

public class CheckBoxPOJO {
    public String name;
    boolean checked;
    boolean isFixed;

    CheckBoxPOJO(String name, boolean checked, boolean isFixed) {
        this.name = name;
        this.checked = checked;
        this.isFixed = isFixed;
    }

    public boolean isChecked() {
        return checked;
    }

    public boolean isFixed() {
        return isFixed;
    }

    public String getName() {
        return name;
    }
}
