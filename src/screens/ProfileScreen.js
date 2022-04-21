import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ProfileScreen = () => {
    return (
       <View style={styles.container}>
           <Text style={styles.title}>ProfileScreen</Text>
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

export default ProfileScreen;