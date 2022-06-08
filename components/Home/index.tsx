import React from 'react';
import {ImageBackground, SafeAreaView, Text, View} from 'react-native';

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1619966001264-f8f3987a3e72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
          style={{width: '100%', aspectRatio: 3 / 8, opacity: 0.7}}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 24, color: 'white'}}>
              Welcome to EatAware
            </Text>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Home;
