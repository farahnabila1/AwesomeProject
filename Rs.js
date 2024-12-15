import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Animated,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapLocation, faBed, faHospitalUser } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [scaleAnim] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ImageBackground
            source={{ uri: 'https://png.pngtree.com/background/20210711/original/pngtree-public-welfare-love-clinic-picture-image_1098595.jpg' }}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.landingTitle}>
                    Selamat Datang di
                    <Text style={styles.highlight}> CareLink Surabaya</Text>
                </Text>
                <Text style={styles.subTitle}>
                    Layanan kesehatan terpercaya di Kota Surabaya
                </Text>
                <View style={styles.quickInfoContainer}>
                    {[
                        { icon: faMapLocation, text: 'Peta Sebaran Rumah Sakit', color: '#3182CE' }, // Biru
                        { icon: faBed, text: 'Formulir Pesan Kamar Pasien', color: '#38B2AC' },    // Hijau Turquoise
                        { icon: faHospitalUser, text: 'Web Fasilitas Kesehatan Surabaya', color: '#E53E3E' }, // Merah
                    ].map((item, index) => (
                        <Animated.View
                            key={index}
                            style={[styles.quickInfoCard, { transform: [{ scale: scaleAnim }] }]}
                        >
                            <TouchableOpacity
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                                activeOpacity={0.8}
                                style={styles.cardContent}
                            >
                                {/* Warna ikon diubah berdasarkan properti 'color' */}
                                <FontAwesomeIcon icon={item.icon} size={32} color={item.color} />
                                <Text style={styles.quickInfoText}>{item.text}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

            </ScrollView>
        </ImageBackground>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFC', // Soft gray background
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    landingTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748', // Dark blue-gray
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        fontFamily: 'Poppins',
    },
    subTitle: {
        fontSize: 17,
        color: '#718096', // Medium gray for subtitle
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Roboto',
    },
    highlight: {
        color: '#3182CE', // Bright blue
        fontWeight: 'bold',
    },
    quickInfoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 15,
    },
    quickInfoCard: {
        backgroundColor: '#FFFFFF', // White background
        borderRadius: 15,
        paddingVertical: 18,
        paddingHorizontal: 12,
        marginHorizontal: 8,
        width: 130,
        elevation: 4,
        shadowColor: '#CBD5E0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0', // Soft border
    },
    cardContent: {
        alignItems: 'center',
    },
    quickInfoText: {
        color: '#2D3748', // Darker text for readability
        fontSize: 15,
        fontWeight: '600',
        marginTop: 6,
        textAlign: 'center',
        fontFamily: 'Arial',
    },
});