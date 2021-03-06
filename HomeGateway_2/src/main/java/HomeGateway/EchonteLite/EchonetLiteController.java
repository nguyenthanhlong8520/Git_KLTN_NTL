package main.java.HomeGateway.EchonteLite;
import com.sonycsl.echo.EchoProperty;
import com.sonycsl.echo.Echo;
import com.sonycsl.echo.eoj.EchoObject;
import com.sonycsl.echo.eoj.device.DeviceObject;
import com.sonycsl.echo.eoj.device.airconditioner.HomeAirConditioner;
import com.sonycsl.echo.eoj.device.housingfacilities.GeneralLighting;
import com.sonycsl.echo.eoj.device.sensor.HumiditySensor;
import com.sonycsl.echo.eoj.device.sensor.IlluminanceSensor;
import com.sonycsl.echo.eoj.device.sensor.TemperatureSensor;
import com.sonycsl.echo.eoj.profile.NodeProfile;
import com.sonycsl.echo.processing.defaults.DefaultController;
import com.sonycsl.echo.processing.defaults.DefaultNodeProfile;
import main.java.HomeGateway.EchonteLite.DeviceProcess.LightingProcess;
import main.java.HomeGateway.EchonteLite.SensorsProcess.HumidityProcess;
import main.java.HomeGateway.EchonteLite.SensorsProcess.IlluminanceProcess;
import main.java.HomeGateway.EchonteLite.SensorsProcess.TemperatureProcess;
import main.java.HomeGateway.MqttBroker.TopicDevices;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.sql.SQLOutput;
import java.util.Timer;
import java.util.TimerTask;


// override function using for user
public class EchonetLiteController {
    private int countPayload = 0;
    private CheckReliable checkReliable = new CheckReliable();

    public static int ConvertByteToInt(byte[] b)
    {
        int value= 0;
        for(int i=0;i<b.length;i++){
            int n=(b[i]<0?(int)b[i]+256:(int)b[i])<<(8*i);
            value+=n;
        }
        return value;
    }

    public EchonetLiteController(TopicDevices topicDevices) {

        Echo.addEventListener(new Echo.EventListener() {
            // Call whenever a new Home air conditional is discovered on the network
            @Override
            public void onNewHomeAirConditioner(HomeAirConditioner device) {
                super.onNewHomeAirConditioner(device);
                System.out.println("onNewHomeAirConditioner");
                // Before calling Get ... methods, we set up a Receiver to receiver the responses
                device.setReceiver(new HomeAirConditioner.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success);
                        if(!success){
                            System.out.println("Can't get any value of Operation Status");
                            return;
                        }
                        try {
                            System.out.println("EDT Operation Status: " + property.edt[0]);
                        }catch (Exception e){
                            System.out.println(e);
                        }

                        if(property.edt[0] == 0x30){
                            System.out.println("Status ON");
                            return;
                        }
                        else if (property.edt[0] == 0x31){
                            System.out.println("Status OFF");
                        }
                    }

                    @Override
                    protected void onGetMeasuredValueOfRoomTemperature(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredValueOfRoomTemperature(eoj, tid, esv, property, success);
                        if(!success){
                            System.out.println("Can't get any value");
                            return;
                        }
                        int Temperature = ConvertByteToInt(property.edt);
                        System.out.println("Temperature " + Temperature);
                    }

                    @Override
                    protected void onGetMeasuredValueOfRoomRelativeHumidity(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredValueOfRoomTemperature(eoj, tid, esv, property, success);
                        if(!success){
                            System.out.println("Can't get any value");
                            return;
                        }
                        int humidity = ConvertByteToInt(property.edt);
                        System.out.println("Humidity" + humidity);
                    }

                    @Override
                    protected void onGetMeasuredValueOfCurrentConsumption(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredValueOfCurrentConsumption(eoj, tid, esv, property, success);
                        if(!success){
                            System.out.println("Can't get any value consumption");
                            return;
                        }
                        int Consumption_A = ConvertByteToInt(property.edt);
                        System.out.println("Consumption" + Consumption_A);
                    }

                    @Override
                    protected void onGetRatedPowerConsumption(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetRatedPowerConsumption(eoj, tid, esv, property, success);
                        if(!success){
                            System.out.println("Can't get any value Power");
                            return;
                        }
                        int Consumption_A = ConvertByteToInt(property.edt);
                        System.out.println("Power" + Consumption_A);
                    }
                });
                try{
                    HomeAirConditioner.setG().reqSetOperationStatus(new byte[]{0x31}).send();
                    HomeAirConditioner.setG().reqSetSetTemperatureValue(new byte[]{0x17}).send();
                    device.get().reqGetOperationStatus().send();
                    device.get().reqGetMeasuredValueOfRoomTemperature().send();
                    device.get().reqGetMeasuredValueOfCurrentConsumption().send();
                    device.get().reqGetGetPropertyMap().send();
                    device.get().reqGetRatedPowerConsumption().send();
                    //device.get().reqGetMeasuredValueOfRoomRelativeHumidity().send();
                }catch(Exception e){
                    System.out.println("Exception + " + e);
                }
            }
        });


        Timer timeRequest = new Timer();
        try {
            // Creating a first node
            // echo.start is method to create a node
            Echo.start(new DefaultNodeProfile(), new DeviceObject[]{new DefaultController()});
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
        timeRequest.scheduleAtFixedRate(
                new TimerTask() {
                    public void run() {
                        try {
                            //Searching for other appliances
                            // searching for request all node send information to your node
                            NodeProfile.informG().reqInformInstanceListNotification().send();
                            System.out.println("Searching Device in Home ........................................");
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                },0, TimeRequest.homeGatewayTime);
    }
}