import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);

  return (
    <View className="pt-9 bg-[#84d9f3] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/orderPlaced.gif")}
        animation={"slideInUp"}
        iterationCount={1}
        className="w-full"
      />

      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </View>
  );
};

export default PreparingOrderScreen;
