package main.java.HomeGateway;

import com.sonycsl.echo.eoj.device.DeviceObject;
import com.sonycsl.echo.eoj.device.airconditioner.HomeAirConditioner;
import main.java.HomeGateway.Account.Account;
import main.java.HomeGateway.EchonteLite.EchonetLiteController;
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
import java.sql.SQLOutput;


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
                System.out.println("Message from Broker :" + message.toString());
                if(object_airConditioner.airConditioner.size() != 0){
                    for(DeviceObject dev : object_airConditioner.airConditioner){
                        //IF ELSE MAC ADDRES

                        // LUONG GIO MANH
                        if(message.toString().equals("Flow_High")){
                            byte A = Integer.valueOf(0xA0).byteValue();
                            byte[] B = BigInteger.valueOf(0x38).toByteArray();
                            dev.set().reqSetProperty(A, B).send();
                            System.out.println("High");
                        }
                        else if(message.toString().equals("Flow_Mid")){
                            byte A = Integer.valueOf(0xA0).byteValue();
                            byte[] B = BigInteger.valueOf(0x35).toByteArray();
                            dev.set().reqSetProperty(A, B).send();
                            System.out.println("Mid");
                        }
                        else if(message.toString().equals("Flow_Auto")){
                            byte A = Integer.valueOf(0xA0).byteValue();
                            byte[] B = BigInteger.valueOf(0x41).toByteArray();
                            dev.set().reqSetProperty(A, B).send();
                            System.out.println("Auto");
                        }
                        else if(message.toString().equals("Flow_Low")){
                            byte A = Integer.valueOf(0xA0).byteValue();
                            byte[] B = BigInteger.valueOf(0x31).toByteArray();
                            dev.set().reqSetProperty(A, B).send();
                            System.out.println("Low");
                        }

                        // direction phuong dung
                        if(message.toString().equals("Up_Vertical")){
                            byte c = Integer.valueOf(0xA4).byteValue();
                            byte[] d = BigInteger.valueOf(0x41).toByteArray();
                            dev.set().reqSetProperty(c, d).send();
                            System.out.println("Up vertical");
                        }
                        else if(message.toString().equals("Down_Vertical")){
                            byte c = Integer.valueOf(0xA4).byteValue();
                            byte[] d = BigInteger.valueOf(0x42).toByteArray();
                            dev.set().reqSetProperty(c, d).send();
                            System.out.println("Down vertical");
                        }
                        else if(message.toString().equals("Central_Direction_Vertical")){
                            byte c = Integer.valueOf(0xA4).byteValue();
                            byte[] d = BigInteger.valueOf(0x44).toByteArray();
                            dev.set().reqSetProperty(c, d).send();
                            System.out.println("Central vertical");
                        }

                        // phuong ngang
                        byte e = Integer.valueOf(0xA5).byteValue();
                        byte[] f = BigInteger.valueOf(0x41).toByteArray();
                        dev.set().reqSetProperty(e, f).send();

                        // status of air-conditioner
                        if (message.toString().equals("ON")){
                            dev.set().reqSetOperationStatus(new byte[]{0x30}).send();
                            System.out.println("Air conditioner is ON");
                        }
                        else if (message.toString().equals("OFF")){
                            dev.set().reqSetOperationStatus(new byte[]{0x31}).send();
                            System.out.println("Air conditioner is OFF");
                        }

                        // mode
                        else if (message.toString().equals("Auto")){
                            byte epcByte = Integer.valueOf(0xB0).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x41).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner is AUTO MODE");
                        }
                        else if (message.toString().equals("Cool")){
                            byte epcByte = Integer.valueOf(0xB0).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x42).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner is COOL MODE");
                        }
                        else if (message.toString().equals("Dry")){
                            byte epcByte = Integer.valueOf(0xB0).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x433).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner is DRY MODE");
                        }
                        else if (message.toString().equals("Heating")){
                            byte epcByte = Integer.valueOf(0xB0).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x43).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner is Heating");
                        }

                        // Power-saving operation setting
                        else if (message.toString().equals("Power")){
                            byte epcByte = Integer.valueOf(0x8F).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x41).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner is Power-saving MODE");
                        }
                        else if (message.toString().equals("Normal")){
                            byte epcByte = Integer.valueOf(0x8F).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x42).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner is Normal MODE");
                        }

                        // Temperature Value
                        else if (message.toString().equals("18")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x12).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 18");
                        }
                        else if (message.toString().equals("19")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x13).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 19");
                        }
                        else if (message.toString().equals("20")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x14).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 20");
                        }
                        else if (message.toString().equals("21")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x15).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 21");
                        }
                        else if (message.toString().equals("22")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x16).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 22");
                        }
                        else if (message.toString().equals("23")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x17).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 23");
                        }
                        else if (message.toString().equals("24")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x18).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 24");
                        }
                        else if (message.toString().equals("25")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x19).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 25");
                        }
                        else if (message.toString().equals("26")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1A).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 26");
                        }
                        else if (message.toString().equals("27")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1B).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 27");
                        }
                        else if (message.toString().equals("28")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1C).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 28");
                        }
                        else if (message.toString().equals("29")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1D).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 29");
                        }
                        else if (message.toString().equals("30")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1E).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 30");
                        }
                        else if (message.toString().equals("31")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x1F).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
                            System.out.println("Air conditioner temp 31");
                        }
                        else if (message.toString().equals("32")){
                            byte epcByte = Integer.valueOf(0xB3).byteValue();
                            byte[] edtByteArr = BigInteger.valueOf(0x20).toByteArray();
                            dev.set().reqSetProperty(epcByte, edtByteArr).send();
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
