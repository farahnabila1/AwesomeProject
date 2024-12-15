import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faGraduationCap, faHospital } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
    const jsonUrl = 'http://192.168.56.41:3000/rumahsakit';
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [clinicHours, setClinicHours] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [hospitalList, setHospitalList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setHospitalList(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshPage = () => {
        setRefresh(true);
        fetchData();
        setRefresh(false);
    };

    const selectItem = (item) => {
        setSelectedHospital(item);
        setName(item.name);
        setRating(item.rating);
        setType(item.type);
        setAddress(item.address);
        setClinicHours(item.clinicHours);
        setPhone(item.phone);
    };

    const validateRating = (value) => {
        const numericRegex = /^[0-9]*\.?[0-9]*$/;
        if (numericRegex.test(value)) {
            setRating(value);
        }
    };

    const validatePhone = (value) => {
        const phoneRegex = /^[0-9()\-.]*$/;
        if (phoneRegex.test(value)) {
            setPhone(value);
        }
    };

    const submit = () => {
        if (!selectedHospital) {
            alert('No hospital selected');
            return;
        }

        const data = {
            name: name,
            rating: rating,
            type: type,
            address: address,
            clinicHours: clinicHours,
            phone: phone,
        };

        fetch(`${jsonUrl}/${selectedHospital.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                alert('Data updated successfully');
                setName('');
                setRating('');
                setType('');
                setAddress('');
                setClinicHours('');
                setPhone('');
                setSelectedHospital(null);
                refreshPage();
            })
            .catch((error) => console.error(error));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.cardtitle}>Loading...</Text>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nama Rumah Sakit"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tipe"
                                value={type}
                                onChangeText={setType}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Alamat"
                                value={address}
                                onChangeText={setAddress}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nomor Telepon"
                                value={phone}
                                onChangeText={validatePhone}
                                keyboardType="phone-pad"
                            />
                            <TouchableOpacity style={styles.button} onPress={submit}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={{ marginBottom: 10 }}
                            data={hospitalList}
                            onRefresh={refreshPage}
                            refreshing={refresh}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectItem(item)}>
                                    <View style={styles.card}>
                                        <View style={styles.avatar}>
                                            <FontAwesomeIcon icon={faHospital} size={50} />
                                        </View>
                                        <View>
                                            <Text style={styles.cardtitle}>{item.name}</Text>
                                            <Text>{item.type}</Text>
                                            <Text>{item.address}</Text>
                                            <Text>{item.phone}</Text>
                                            <Text>⭐ {item.rating}</Text>
                                            
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <FontAwesomeIcon icon={faPenToSquare} size={20} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Createdata;

const styles = StyleSheet.create({
    form: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatar: {
        marginRight: 20,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
});
