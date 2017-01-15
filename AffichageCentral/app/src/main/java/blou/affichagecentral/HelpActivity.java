package blou.affichagecentral;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class HelpActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_help);

        RelativeLayout main = (RelativeLayout)findViewById(R.id.activity_help);
        if(Params.jour)
            main.setBackgroundColor(0x00000000);
        else
            main.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));

        TextView help_textview = (TextView)findViewById(R.id.help_text_view);
        Button ok_help = (Button) findViewById(R.id.button_ok_help);

        String help_text = "BLOUBLOU\nBLOUBLOUBLOU";
        help_textview.setText(help_text);
    }

    public void goToMain(View v) {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}
