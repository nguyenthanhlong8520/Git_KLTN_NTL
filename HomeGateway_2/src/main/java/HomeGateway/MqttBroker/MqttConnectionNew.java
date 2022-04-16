package main.java.HomeGateway.MqttBroker;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;

import java.util.ArrayList;

public class MqttConnectionNew {
        String host;
        public MqttClient mMqttClient;
        public MqttConnectionNew(String host){
            this.host = host;
        };

        public void Connect(){
            try {
                mMqttClient = new MqttClient("tcp://"+this.host+":1883",MqttClient.generateClientId());
                mMqttClient.connect();
            } catch (MqttException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }
        public void Connect(MqttConnectOptions options){
            try {
                mMqttClient = new MqttClient("tcp://"+this.host+":1883",MqttClient.generateClientId());
                mMqttClient.connect(options);
            } catch (MqttException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }
        public void Disconnect(){
            try {
                mMqttClient.disconnect();
            } catch (MqttException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        public void PublishMessage(String message, String topic){
            try {
                MqttMessage messageMqtt = new MqttMessage();
                System.out.println("topic:");
                System.out.println(topic);
                System.out.println("mess String:");
                System.out.println(message);
                System.out.println("mess Byte:");
                System.out.println(message.getBytes());
                messageMqtt.setPayload(message.getBytes());
                messageMqtt.setQos(0);
                mMqttClient.publish(topic, messageMqtt);
            } catch (MqttException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        public void Subcribe(String topic){
            try {
                mMqttClient.subscribe(topic);
            } catch (MqttException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

}
