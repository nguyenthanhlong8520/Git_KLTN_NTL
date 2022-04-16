package main.java.HomeGateway;

import com.sonycsl.echo.eoj.device.DeviceObject;
import com.sonycsl.echo.eoj.device.airconditioner.HomeAirConditioner;
import main.java.HomeGateway.Account.Account;
import main.java.HomeGateway.EchonteLite.EchonetLiteControllerNew;
import main.java.HomeGateway.MqttBroker.MqttConnectionNew;
import main.java.HomeGateway.MqttBroker.TopicDevices;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.io.IOException;
import java.net.URISyntaxException;


public class Main {

    public static MqttConnectionNew mqttCon1;

    public static void main(String[] args) throws IOException, URISyntaxException {
        System.setProperty("java.net.preferIPv4Stack" , "true");
        Account account = new Account();
        TopicDevices topicDevices = new TopicDevices();
        topicDevices.createHashMap();
        //EchonetLiteController echonetLiteController = new EchonetLiteController(topicDevices);
//        mqttCon1 = new MqttConnectionNew("airconditioner.cloud.shiftr.io");
//        String password = "long8520";
//        MqttConnectOptions optionsConnect = new MqttConnectOptions();
//        optionsConnect.setUserName("airconditioner");
//        optionsConnect.setPassword(password.toCharArray());
//        optionsConnect.setAutomaticReconnect(true);
//        optionsConnect.setCleanSession(true);
//        mqttCon1.Connect(optionsConnect);
//          EchonetLiteControllerNew object_airConditioner = new EchonetLiteControllerNew();
//        mqttCon1.Subcribe("home/room_01/air-conditioner");
//        mqttCon1.PublishMessage("From IoT Platform", "home/room_01/air-conditioner");
//        mqttCon1.mMqttClient.setCallback(new MqttCallbackExtended(){
//            @Override
//            public void connectComplete(boolean reconnect, String serverURI) {
//                System.out.println("Connection " + reconnect + "; server " + serverURI);
//            }
//
//            @Override
//            public void connectionLost(Throwable throwable) {
//                System.out.println("MQTT publisher error: Lost MQTT Connection" + throwable.getMessage());
//				/*System.out.println("Reconn...");
//				mqttCon1.Connect(optionsConnect);*/
//            }
//
//            @Override
//            public void messageArrived(String topic, MqttMessage message) throws Exception {
//                //System.out.println("message is "+ message);
//                System.out.println("Message : " + message.toString());
//                if(object_airConditioner.airConditioner.size() != 0){
//                    for(DeviceObject dev : object_airConditioner.airConditioner){
//                        if (message.toString() == "27"){
//                            dev.set().reqSetOperationStatus(new byte[]{0x30});
//                            //dev.set().reqSetProperty()
//                        }
//                    }
//                }
//            }
//
//            @Override
//            public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
//
//            }
//        });
    }
}
