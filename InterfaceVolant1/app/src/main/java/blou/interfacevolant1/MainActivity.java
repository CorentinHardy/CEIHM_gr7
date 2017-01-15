package blou.interfacevolant1;

import android.content.pm.ActivityInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private int id;
    private MyWebClient webClient;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        this.setContentView(R.layout.activity_main);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        id=0;
        webClient = new MyWebClient();
    }

    public void up(View v) {
        if(id==0)
            id=6;
        else
            id--;

        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(-3);
            }
        });
        t.start();
    }

    public void down(View v) {
        if(id==6)
            id=0;
        else
            id++;

        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(-2);
            }
        });
        t.start();
    }

    public void sendId(View v) {
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(id);
                id=0;
            }
        });
        t.start();
    }

    public void sendCancel(View v) {
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(-1);
            }
        });
        t.start();
    }
}
