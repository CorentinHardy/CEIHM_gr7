package blou.affichagecentral;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;

import java.util.ArrayList;
import java.util.List;

public class SupprimActivity extends AppCompatActivity {

    private List<Integer> list_button;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_supprim);

        LinearLayout main = (LinearLayout)findViewById(R.id.supprim_main_layout_id);
        if(Params.jour)
            main.setBackgroundColor(0x00000000);
        else
            main.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));

        this.list_button = new ArrayList<>();
    }

    public void saveIdButton(View v) {
        int nb = Integer.parseInt(v.getTag().toString());
        for(int i : list_button) {
            if(i==nb) { //déjà sélectionné pour supprimer, on l'enlève
                list_button.remove(new Integer(nb));
                v.setBackgroundColor(0x00000000);
                return;
            }
        }
        list_button.add(nb);
        v.setBackgroundColor(getResources().getColor(R.color.colorAccent));
    }

    public void supprimAndGoBackToBusiness(View v) {
        String to_delete="";
        for(int i : list_button) {
            to_delete= to_delete+i+" ";
        }
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("ERASED",to_delete);
        startActivity(intent);
    }

    public void goBackToBusiness(View v) {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}
