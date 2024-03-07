import React, { FC, ReactNode } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

interface DataLoadingWrapperProps {
  children: ReactNode;
}

const DataLoadingWrapper: FC<DataLoadingWrapperProps> = ({ children }) => {
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка данных...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {children} {/* Рендерим дочерние компоненты */}
    </NavigationContainer>
  );
};

export default DataLoadingWrapper;
