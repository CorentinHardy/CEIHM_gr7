package blou.affichagecentral;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutCompat;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Switch;

public class ParamActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_param);

        LinearLayout main = (LinearLayout)findViewById(R.id.activity_param);
        if(Params.jour)
            main.setBackgroundColor(0x00000000);
        else
            main.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));

    }

    //pour le moment on regarde que le mode nuit
    public void changeSettingsAndGoBackToBusiness(View v) {
        Switch switch_attention_il_va_faire_noir = (Switch) findViewById(R.id.ta_gueule);
        if(switch_attention_il_va_faire_noir.isChecked())
            Params.jour=false;
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    public void goBackToBusiness(View v) {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    public void jourNuitJourNuitJourNuit(View v) {
        LinearLayout main = (LinearLayout)findViewById(R.id.activity_param_main_view);
        Switch switch_attention_il_va_faire_noir = (Switch) findViewById(R.id.ta_gueule);
        if(switch_attention_il_va_faire_noir.isChecked()) {
            main.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
        }
        else {
            main.setBackgroundColor(0x00000000);
        }
    }

}
