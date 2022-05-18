import React, {useState} from "react";
import { View, Text } from "react-native";


const Time = () => {
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString();

  const [cTime, setcTime] = useState(time);
  const [cDate, setDate]  = useState(date);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    date = new Date().toLocaleDateString();
    setcTime(time);
    setDate(date);
  }

  setInterval(updateTime, 1000);
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20
      }}
    >
      <View style={{ backgroundColor: "blue", flex: 0.3 }} />
      <View style={{ backgroundColor: "red", flex: 0.5 }} />
      <Text>Hello World! {cTime}</Text>
      <Text>{cDate}</Text>
    </View>
  );
};

export default Time;