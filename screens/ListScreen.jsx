import { FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getMyBucketList } from '../services/DbService';
import { useFocusEffect } from '@react-navigation/native';

const ListScreen = ({ navigation }) => {

    const goToAdd = () => { navigation.navigate("Add") };
    const [bucketItems, setBucketItems] = useState([])

    useEffect(() => {
        handleGettingOfData()
    }, []);

    const handleGettingOfData = async () => {
        var allData = await getMyBucketList();
        setBucketItems(allData)
        console.log("All Items: " + bucketItems)
        // return handleGettingOfData
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
        handleGettingOfData()
        if (bucketItems == []) {
            setRefreshing(true)
        } else {
            setRefreshing(false);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        // handleGettingOfData()
        return () => {

        }
    }, []))

    return (
        <SafeAreaView >
            <View style={styles.container}>

                <Pressable style={styles.addButton} onPress={goToAdd}>
                    <Text style={styles.addButtonText}>Add</Text>
                    <Entypo name="bucket" size={16} color="green" />
                </Pressable>


                {/* THIS WILL LOOP FOR EACH ITEM */}
                <FlatList
                    data={bucketItems}
                    renderItem={({ item }) =>
                    (<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Details")}>
                        <Text>{item.title}</Text>
                        {
                            item.priority && <AntDesign name="star" size={24} color="orange" />
                        }
                    </TouchableOpacity>)}

                    // Render when array is empty
                    ListEmptyComponent={() => (
                        <TouchableOpacity>
                            <Text>
                                No tasks yet
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: 10, width: 10 }} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
                {/* END LOOP */}
            </View>

        </SafeAreaView>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addButton: {
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 2,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    addButtonText: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold'
    }
})