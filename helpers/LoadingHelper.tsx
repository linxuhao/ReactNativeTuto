import React from 'react';
import { View, StyleSheet, ActivityIndicator } from "react-native";

  export function displayLoading(isLoading : boolean) {
    if (isLoading === true) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });