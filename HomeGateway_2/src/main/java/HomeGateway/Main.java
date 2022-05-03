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
import java.math.BigInteger;
import java.net.URISyntaxException;


public class Main {

    public static MqttConnectionNew mqttCon1;

    public static void main(String[] args) throws IOException, URISyntaxException {
        System.setProperty("java.net.preferIPv4Stack" , "true");
        Account account = new Account();
        TopicDevices topicDevices = new TopicDevices();
        topicDevices.createHashMap();
//      EchonetLiteController echonetLiteController = new EchonetLiteController(topicDevices);
        mqttCon1 = new MqttConnectionNew("airconditioner.cloud.shiftr.io");
        String password = "long8520";
        MqttConnectOptions optionsConnect = new MqttConnectOptions();
        optionsConnect.setUserName("airconditioner");
        optionsConnect.setPassword(password.toCharArray());
        optionsConnect.setAutomaticReconnect(true);
        optionsConnect.setCleanSession(true);
        mqttCon1.Connect(optionsConnect);
        EchonetLiteControllerNew object_airConditioner = new EchonetLiteControllerNew();
        mqttCon1.Subcribe("home/room_01/air-conditioner");
        mqttCon1.PublishMessage("From IoT Platform", "home/room_01/air-conditioner");
        mqttCon1.mMqttClient.setCallback(new MqttCallbackExtended(){
            @Override
            public void connectComplete(boolean reconnect, String serverURI) {
                System.out.println("Connection " + reconnect + "; server " + serverURI);
            }

            @Override
            public void connectionLost(Throwable throwable) {
                System.out.println("MQTT publisher error: Lost MQTT Connection" + throwable.getMessage());
				/*System.out.println("Reconn...");
				mqttCon1.Connect(optionsConnect);*/
            }

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                //System.out.println("message is "+ message);
                System.out.println("Message from Broker : " + message.toString());
                if(object_airConditioner.airConditioner.size() != 0){
                    for(DeviceObject dev : object_airConditioner.airConditioner){
                        if (message.toString() == "ON"){
                            dev.set().reqSetOperationStatus(new byte[]{0x30});
                            System.out.println("Air conditioner is ON");
                        }
                        else if (message.toString() == "OFF"){
                            dev.set().reqSetOperationStatus(new byte[]{0x31});
                            System.out.println("Air conditioner is OFF");
                        }
                        else if (message.toString() == "AUTO"){
                            byte epcByte = Integer.valueOf(0xB0).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x41).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner is AUTO MODE");
                        }
                        else if (message.toString() == "COOL"){
                            byte epcByte = Integer.valueOf(0xB0).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x42).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner is COOL MODE");
                        }
                        else if (message.toString() == "DRY"){
                            byte epcByte = Integer.valueOf(0xB0).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x433).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner is DRY MODE");
                        }
                        // Temperature Value
                        else if (message.toString() == "16"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x10).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 16");
                        }
                        else if (message.toString() == "17"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x11).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 17");
                        }
                        else if (message.toString() == "18"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x12).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 18");
                        }
                        else if (message.toString() == "19"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x13).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 19");
                        }
                        else if (message.toString() == "20"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x14).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 20");
                        }
                        else if (message.toString() == "21"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x15).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 21");
                        }
                        else if (message.toString() == "22"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x16).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 22");
                        }
                        else if (message.toString() == "23"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x17).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 23");
                        }
                        else if (message.toString() == "24"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x18).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 24");
                        }
                        else if (message.toString() == "25"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x19).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 25");
                        }
                        else if (message.toString() == "26"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1A).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 26");
                        }
                        else if (message.toString() == "27"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1B).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 27");
                        }
                        else if (message.toString() == "28"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1C).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 28");
                        }
                        else if (message.toString() == "29"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1D).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 29");
                        }
                        else if (message.toString() == "30"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1E).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 30");
                        }
                        else if (message.toString() == "31"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1F).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 31");
                        }
                        else if (message.toString() == "32"){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x20).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr);
                            System.out.println("Air conditioner temp 32");
                        }
                    }
                }
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

            }
        });
    }
}
