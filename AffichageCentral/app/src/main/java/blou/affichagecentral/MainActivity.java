package blou.affichagecentral;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Layout;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import java.util.ArrayList;
import java.util.List;

import static android.provider.AlarmClock.EXTRA_MESSAGE;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LinearLayout main = (LinearLayout)findViewById(R.id.activity_main_id);
        if(Params.jour)
            main.setBackgroundColor(0x00000000);
        else
            main.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));

        Button b1 = (Button)findViewById(R.id.button1);b1.setVisibility(View.VISIBLE);
        Button b2 = (Button)findViewById(R.id.button2);b2.setVisibility(View.VISIBLE);
        Button b3 = (Button)findViewById(R.id.button3);b3.setVisibility(View.VISIBLE);
        Button b4 = (Button)findViewById(R.id.button4);b4.setVisibility(View.VISIBLE);
        Button b5 = (Button)findViewById(R.id.button5);b5.setVisibility(View.VISIBLE);
        Button b6 = (Button)findViewById(R.id.button6);b6.setVisibility(View.VISIBLE);

        Intent intent = getIntent();
        String erased = intent.getStringExtra("ERASED");
        if(erased!=null) {
            String[] tmp = erased.split(" ");
            List<Integer> list = new ArrayList<>();
            for(String s : tmp)
                list.add(Integer.parseInt(s));
            for(int i : list) {
                switch (i) {
                    case 1:
                        b1.setVisibility(View.INVISIBLE);
                        break;
                    case 2:
                        b2.setVisibility(View.INVISIBLE);
                        break;
                    case 3:
                        b3.setVisibility(View.INVISIBLE);
                        break;
                    case 4:
                        b4.setVisibility(View.INVISIBLE);
                        break;
                    case 5:
                        b5.setVisibility(View.INVISIBLE);
                        break;
                    case 6:
                        b6.setVisibility(View.INVISIBLE);
                        break;
                }
            }
        }
    }

    public void goToParams(View v) {
        Intent intent = new Intent(this, ParamActivity.class);
        startActivity(intent);
    }

    public void goToSupprim(View v) {
        Intent intent = new Intent(this,SupprimActivity.class);
        startActivity(intent);
    }

    public void goToHelp(View v) {
        Intent intent = new Intent(this,HelpActivity.class);
        startActivity(intent);
    }
}
