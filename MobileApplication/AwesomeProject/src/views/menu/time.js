import React, {useState} from "react";
import { View, Text, Dimensions, Button } from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import axios from "axios";
import {BASE_URL} from '../../config';
import CircularProcess from 'react-native-circular-progress-indicator'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Time = () => {
  const [t0, setT0]  = useState("0");
  const [tmax, setTmax]  = useState("0");
  const [t1, setT1]  = useState("0");
  const [t2, setT2]  = useState("0");
  const [t3, setT3]  = useState("0");

  const getDataTemp = () => {
    axios
    .post(`${BASE_URL}/remote/dataTemp`)
    .then(res => {
      // console.log(res.data);
      var data =  JSON.parse(JSON.stringify(res.data));
      // var temp = res.data[0].temperature_value;
      console.log(data['t0']);

      setT0(data['t0']);
      setTmax(data['tmax']);
      setT1(data['t1']);
      setT2(data['t2']);
      setT3(data['t3']);
    })
    .catch(e => {
      console.log(`error ${e}`);
    }); 
  };

  return (
  
  <View style={{height: '100%', width:'100%', color: 'blue'}}>
      <View style={{top: 30, backgroundColor:'red'}}>
      <Button
        title="Press me"
        onPress = {() => {
          // getDataTemp()
        }}
      />
      </View>
      <View style={{width:'100%', height:'30%', flexDirection: "row",
                      marginTop: 0.1 * windowHeight, backgroundColor:'red'}}>
          <LineChart
              data={{
                labels: ["Start", "Light Sleep", "Deep Sleep", "REM Sleep", "End time"],
                datasets: [
                  {
                    data: [
                      22,
                      24,
                      26,
                      23,
                      20
                    ]
                  }
                ]
              }}
              width={Dimensions.get("window").width} // from react-native
              height={210}
              yAxisLabel=""
              yAxisSuffix="°C"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}/>
      </View>
      <View>
              <CircularProcess 
                radius={90}
                value={85}
                textColor='#222'
                fontSize= {20}
                
              />
      </View>
  </View>
  );
};

export default Time;