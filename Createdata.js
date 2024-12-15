import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from 'react-native';

const App = () => {
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [roomType, setRoomType] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://192.168.56.41:3000/rumahsakit');
            if (!response.ok) {
                throw new Error('Failed to fetch hospitals data');
            }
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch hospitals data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshPage = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleBooking = () => {
        if (!patientName || !patientPhone || !roomType) {
            Alert.alert('Perhatian', 'Silakan lengkapi semua data pendaftaran');
            return;
        }

        const newBooking = {
            id: Date.now(),
            hospitalId: selectedHospital.id,
            patientName,
            patientPhone,
            roomType,
        };

        setBookings(prev => [...prev, newBooking]);
        Alert.alert('Konfirmasi', 'Pemesanan kamar berhasil dibuat');
        resetForm();
        refreshPage(); // Refresh setelah booking
    };

    const handleDeleteBooking = (id) => {
        Alert.alert(
            'Konfirmasi Pembatalan',
            'Apakah Anda yakin ingin membatalkan pemesanan?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: () => {
                        setBookings(prev => prev.filter(booking => booking.id !== id));
                        Alert.alert('Informasi', 'Pemesanan kamar telah dibatalkan');
                        refreshPage(); // Refresh setelah pembatalan
                    }
                }
            ]
        );
    };

    const resetForm = () => {
        setPatientName('');
        setPatientPhone('');
        setRoomType('');
        setSelectedHospital(null);
    };

    const HospitalDetailView = () => (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Formulir Pendaftaran</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.hospitalName}>{selectedHospital.name}</Text>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Alamat :</Text>
                    <Text style={styles.infoText}>{selectedHospital.address}</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Kontak :</Text>
                    <Text style={styles.infoText}>{selectedHospital.phone}</Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nama Lengkap Pasien"
                        value={patientName}
                        onChangeText={setPatientName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nomor Telepon"
                        keyboardType="phone-pad"
                        value={patientPhone}
                        onChangeText={setPatientPhone}
                    />
                    <View style={styles.roomTypeContainer}>
                        <Text style={styles.roomTypeTitle}>Pilih Kelas Kamar :</Text>
                        {['Kelas VIP', 'Kelas I', 'Kelas II', 'Kelas III'].map(type => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.roomTypeButton, roomType === type && styles.selectedRoomType]}
                                onPress={() => setRoomType(type)}
                            >
                                <Text style={styles.roomTypeButtonText}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleBooking}
                    >
                        <Text style={styles.submitButtonText}>Ajukan Pendaftaran</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backButtonSecondary}
                        onPress={() => setSelectedHospital(null)}
                    >
                        <Text style={styles.backButtonTextSecondary}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

    const HospitalListView = () => (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Daftar Rumah Sakit</Text>
                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={refreshPage}
                >
                    <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>

            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#2980B9" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={hospitals}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.hospitalCard}
                            onPress={() => setSelectedHospital(item)}
                        >
                            <View style={styles.hospitalCardContent}>
                                <Text style={styles.hospitalName}>{item.name}</Text>
                                <View style={styles.hospitalCardDetails}>
                                    <Text style={styles.hospitalType}>{item.type}</Text>
                                    <Text style={styles.hospitalRating}>
                                        Rating : ⭐{item.rating.toFixed(1)}
                                    </Text>
                                </View>
                                <Text style={styles.hospitalAddress}>{item.address}</Text>
                                <Text style={styles.hospitalClinicHours}>
                                    {item.clinicHours ? item.clinicHours : 'Buka 24 Jam'}
                                </Text>
                
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
            <View style={styles.bookingListSection}>
                <Text style={styles.bookingListTitle}>Daftar Pendaftaran</Text>
                <FlatList
                    data={bookings}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        const hospital = hospitals.find(h => h.id === item.hospitalId);
                        return (
                            <View style={styles.bookingCard}>
                                <View style={styles.bookingDetails}>
                                    <Text style={styles.bookingName}>{item.patientName}</Text>
                                    <Text style={styles.bookingHospital}>{hospital?.name}</Text>
                                    <Text style={styles.bookingRoom}>{item.roomType}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => handleDeleteBooking(item.id)}
                                >
                                    <Text style={styles.cancelButtonText}>Batalkan</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    refreshing={refreshing}
                    onRefresh={refreshPage}
                />
            </View>
        </SafeAreaView>
    );

    return selectedHospital ? <HospitalDetailView /> : <HospitalListView />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C3E50',
    },
    detailContainer: {
        padding: 20,
    },
    hospitalName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 10,
    },
    infoSection: {
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495E',
    },
    infoText: {
        fontSize: 16,
        color: '#7F8C8D',
    },
    formContainer: {
        marginTop: 12,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BDC3C7',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    roomTypeContainer: {
        marginBottom: 10,
    },
    roomTypeTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#2C3E50',
    },
    roomTypeButton: {
        borderWidth: 1,
        borderColor: '#2980B9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    selectedRoomType: {
        backgroundColor: '#3498DB',
        borderColor: '#3498DB',
    },
    roomTypeButtonText: {
        textAlign: 'center',
        color: '#2C3E50',
    },
    submitButton: {
        backgroundColor: '#3498DB',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    backButtonSecondary: {
        backgroundColor: '#BDC3C7', // Light gray background
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    backButtonTextSecondary: {
        color: '#2C3E50',
        fontSize: 16,
        fontWeight: '600',
    },
    hospitalCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    hospitalCardContent: {
        flexDirection: 'column',
    },
    hospitalName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
    },
    hospitalCardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    hospitalType: {
        fontSize: 14,
        color: '#7F8C8D',
    },
    hospitalRating: {
        fontSize: 14,
        color: '#F39C12',
    },
    hospitalAddress: {
        fontSize: 14,
        color: '#2C3E50',
        marginBottom: 5,
    },
    hospitalClinicHours: {
        fontSize: 14,
        color: '#2980B9',
        marginTop: 4,
        fontStyle: 'italic',
    },
    bookingListSection: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    bookingListTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 10,
    },
    bookingCard: {
        backgroundColor: '#FFFFFF',
        marginVertical: 8,
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookingCardContent: {
        flex: 1,
    },
    bookingCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 5,
    },
    bookingCardSubtitle: {
        fontSize: 14,
        color: '#7F8C8D',
        marginBottom: 3,
    },
    bookingCardRoom: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3498DB',
    },
    cancelButton: {
        backgroundColor: '#E74C3C',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    refreshButton: {
        backgroundColor: '#3498DB', // Warna biru
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto', // Untuk memindahkan tombol ke sebelah kanan
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    refreshButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default App;
