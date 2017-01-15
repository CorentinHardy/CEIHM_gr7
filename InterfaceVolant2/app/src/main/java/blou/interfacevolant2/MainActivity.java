package blou.interfacevolant2;

import android.content.pm.ActivityInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

public class MainActivity extends AppCompatActivity {

    private MyWebClient webClient;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        this.setContentView(R.layout.activity_main);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        webClient=new MyWebClient();
    }

    public void send0(View v) {
        Thread t=  new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(0);
            }
        });
        t.start();
    }

    public void send1(View v) {
        Thread t=  new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(1);
            }
        });
        t.start();
    }

    public void send2(View v) {
        Thread t=  new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(2);
            }
        });
        t.start();
    }

    public void send3(View v) {
        Thread t=  new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(3);
            }
        });
        t.start();
    }

    public void send4(View v) {
        Thread t=  new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(4);
            }
        });
        t.start();
    }

    public void send5(View v) {
        Thread t=  new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(5);
            }
        });
        t.start();
    }

    public void send6(View v) {
        Thread t=  new Thread(new Runnable() {
            @Override
            public void run() {
                webClient.sendGet(6);
            }
        });
        t.start();
    }

}
