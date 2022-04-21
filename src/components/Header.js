import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';

import { theme } from "../constants/theme";


const Header = (props) => {
  const {isNetwork, idTheme} = useSelector(state => state);
  const { isMenu, isBack, navigation } = props;

  const styles = getStyle(idTheme);

    return (
      <SafeAreaView style={styles.statusBar}>
        
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
        <View style={[styles.container, {marginTop: 3}]}>

            <TouchableOpacity>
              <Text style={styles.title}>SpeciSAYP</Text>
            </TouchableOpacity>
            {
              isBack && (
                <Icon onPress={()=>navigation.goBack()} style={{...styles.iconMenu, top: 10, left: 15}} name={`chevron-back-outline`} size={30} />
              )
            }
            
            {
              isMenu && (
                <Icon onPress={()=>navigation.openDrawer()} style={{...styles.iconMenu, top: 10, right: 15}} name={`menu-outline`} size={30} />
              )
            }
         
        </View>
        <Text style={{...styles.text, color: isNetwork ? theme[idTheme].header.isNetwork: 'red'}}>{isNetwork ? 'Online' : 'Offline' }  </Text>
      </SafeAreaView>
    );
}

const getStyle = (key) => {
    return {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "row",
            backgroundColor: theme[key].header.backgroundColor,//
            
          },
          statusBar:{
            ...Platform.select({
              ios: {
                height: 110,
              },
              android: {
                height: 90,
              },
            }),
            paddingTop: 30,
            backgroundColor: theme[key].header.backgroundColor,
          },
          title: {
            textTransform: 'uppercase',
            color: theme[key].header.textColor,
            fontSize: 16,

          },
          text:{
            fontWeight: 'bold',
            backgroundColor: theme[key].header.backgroundColor, 
            marginTop: 5, 
            marginBottom: 3,
            textAlign: 'center',
            alignSelf: 'center',
            color: theme[key].header.isNetwork,
            fontSize: 14,
            width: 100
          },
          iconMenu:{
            height: 40,
            width: 40,
            color: theme[key].header.textColor,
            position: "absolute"
          }
    }
}

export default Header;