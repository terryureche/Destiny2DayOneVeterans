import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {searchUser, getMembershipDataById, getSummaryProfile} from './../../api/Bungi';
const HomeScreen = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const [userList, setUserList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    function resolveUsers(rawData) {
        const data = rawData.data;
        const rawUsers = data.Response;

        let users = rawUsers.map((user) => {
            return {
                "xboxUsername": user.xboxDisplayName,
                "psUsername": user.psnDisplayName,
                "profilePictureUrl": 'https://www.bungie.net' + user.profilePicturePath,
                "profileId": user.membershipId,
                "displayName": user.displayName
            }
        });

        return users;
    }

    async function getUsers() {
        setShowLoading(true);
        try {
            if (searchText) {
                const rawData = await searchUser(searchText);

                let users = resolveUsers(rawData);

                setUserList(users);
            } else {
                setUserList([]);
            }
        } catch (e) {
            setUserList([])
        }
        setShowLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, [searchText]);

    const onTouch = (item) => {
        navigation.navigate('Detail', {
            profileId: item.profileId
        });
    }

    const Item = ({item}) => {
        const {xboxUsername, psUsername, profilePictureUrl, profileId, displayName} = item;

        return (
            <TouchableOpacity onPress={() => onTouch(item)}>
                <View style={styles.mainView}>
                    <Image source={{uri: profilePictureUrl}} style={styles.image} />
                    <View style={styles.profile}>
                        <Text style={styles.displayName}>Display Name: {displayName}</Text>
                        <Text>Profile ID: {profileId}</Text>
                        {xboxUsername && <Text>Xbox Name: {xboxUsername}</Text>}
                        {psUsername && <Text>PS Name: {psUsername}</Text>}
                    </View>
                </View>
            </TouchableOpacity>
        )

    }

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '90%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '5%'
                }}
            />
        )
    }

    const renderItem = ({item}) => {return <Item item={item} />;}

    return (
        <View style={styles.container}>
            {/* <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                onChangeText={setSearchText}
                value={searchText}
                placeholder="User Id"
            /> */}
            <SearchBar
                round={true}
                placeholder="User ID..."
                autoCorrect={false}
                autoCompleteType="off"
                autoCapitalize="none"
                onChangeText={setSearchText}
                value={searchText}
                showLoading={showLoading}
                lightTheme={true}
                onClear={() => {setUserList([])}}
                containerStyle={styles.input}
            />
            <FlatList
                style={styles.flatList}
                data={userList}
                renderItem={renderItem}
                keyExtractor={item => item.profileId}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )

};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: "15%",
        textAlign: 'left',
        paddingTop: 50,
        fontSize: 20
    },
    row: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 30
    },
    profile: {
        paddingLeft: 15,
        alignItems: 'flex-start',
        flex: 1
    },
    displayName: {
        justifyContent: 'flex-start',
        fontWeight: 'bold'
    },
    flatList: {
        width: "100%",
        backgroundColor: "transparent"
    },
    mainView: {
        // flex: 1,
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%'
    }
});

export default HomeScreen;