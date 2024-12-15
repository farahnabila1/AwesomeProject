import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPen, faBed, faStethoscope, faHospitalUser, faUser, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import Profil from './App';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import ProfilRs from './Rs';
import Editdata from './Editdata';
const webmap = require('./data/map.html');

function ProfilRsScreen() {
    return (
        < ProfilRs />
    );
}

function MapsScreen() {
    return (
        <WebView
            source={webmap}
        />
    );
}

function HomeScreen() {
    return (
        < Createdata />
    );
}

function EditScreen() {
    return (
        < Editdata />
    );
}

function WebScreen() {
    return (
        <WebView
            source={{ uri: 'https://ehealth.surabaya.go.id/pendaftaranv2/' }}
            style={{ flex: 1 }}
        />
    );
}

function ProfilScreen() {
    return (
        <Profil />
    );
}
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="CareLink"
                    component={ProfilRsScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faStethoscope} color={color} size={20} />
                        ),
                    }}
                />

                <Tab.Screen name="Lokasi RS" component={MapsScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faMapLocation} color={color} size={20} />
                    ),
                }} />
                <Tab.Screen name="Pesan Kamar" component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faBed} color={color} size={20} />
                    ),
                }} /> 
                <Tab.Screen name="Edit" component={EditScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faUserPen} color={color} size={20} />
                    ),
                }} />
                <Tab.Screen
                    name="e-Health"
                    component={WebScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faHospitalUser} color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profil"
                    component={ProfilScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUser} color={color} size={20} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}