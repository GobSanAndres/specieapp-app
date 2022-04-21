import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const MaintainScreen = () => {
    return (
       <View style={styles.container}>
           <Text style={styles.title}>MaintainScreen</Text>
       </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title:{
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default MaintainScreen;