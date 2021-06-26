import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {ListItem, Icon, Avatar, Text, Button, Divider} from 'react-native-elements';
import {getSummaryProfile} from './../../api/Bungi';
import GuardinProfileConstants from './../../utils/DestinyEnums/GuardinProfileEnums';
import Loading from '../Utils/Loading/Loading';

const MembershipData = ({primaryMembership}) => {
    const [characters, setCharacters] = useState([]);
    const [isExpanded, setIsExpanded] = useState({});
    const [loading, setLoading] = useState(true);

    const getProfileDetails = async () => {
        const {id, type} = primaryMembership;

        if (id && type) {
            try {
                const rawData = await getSummaryProfile(type, id, 200);

                const profileDetails = Object.values(rawData.data.Response.characters.data);

                setCharacters(profileDetails);
                initExpandedItems(profileDetails);

                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e.message);
            }
        }
    }

    useEffect(() => {
        getProfileDetails();

    }, [primaryMembership]);

    const initExpandedItems = (characters) => {
        debugger;
        let itemsKey = {};

        characters.map((item, key) => {
            itemsKey[key] = Object.keys(itemsKey).length === 0 ? true : false;
        });

        setIsExpanded(itemsKey);
    }

    const renderList = (characters) => {
        return characters.map((item, key) => RenderListContent(item, key));
    }

    const handleExpand = (key) => {
        let newValue = !isExpanded[key];
        let newObject = Object.assign({}, isExpanded);

        newObject[key] = newValue;

        setIsExpanded(newObject);

        return true;
    }

    const generateHeaderContent = (item, key) => {
        const backgroundUri = GuardinProfileConstants.urls.bungi + item.emblemBackgroundPath;
        const race = GuardinProfileConstants.race[item.raceType];
        const classType = GuardinProfileConstants.class[item.classType];
        const gender = GuardinProfileConstants.gender[item.genderType];
        const light = '✦' + item.light;
        const characterLvl = 'Level ' + item.baseCharacterLevel;

        return <View style={{width: "100%", padding: 0}} >
            <TouchableOpacity onPress={() => {handleExpand(key)}}>
                <ImageBackground source={{uri: backgroundUri}} style={{width: "100%", height: 70, padding: 0}}>
                    <ListItem.Content style={{flex: 1}}>
                        <View style={styles.mainHeader}>
                            <View style={styles.mainHeaderLs}>
                                <ListItem.Title style={[styles.textBoldWhite]}>{classType}</ListItem.Title>
                                <ListItem.Title style={[styles.textBoldWhite]}>{race}</ListItem.Title>
                                <ListItem.Title style={[styles.textBoldWhite]}>{gender}</ListItem.Title>
                            </View>
                            <View style={styles.mainHeaderRs}>
                                <ListItem.Title style={[styles.textBoldYellow]}>{light}</ListItem.Title>
                                <ListItem.Title style={[styles.textBoldWhite]}>{characterLvl}</ListItem.Title>
                            </View>
                        </View>
                    </ListItem.Content>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    }

    const generateStateDetail = (iconUrl, name, value, index) => {
        return <View key={index} style={styles.bodyDetail}>
            <Text style={{color: 'white'}}>{value}</Text>
            <Avatar source={{uri: iconUrl}} />
        </View>
    }

    const generateStats = (item) => {
        const statsDataRaw = item.stats
        const statsData = Object.entries(statsDataRaw).map(([key, value]) => ({key, value}));

        return statsData.map((value, index) => {
            const statId = value.key;
            const statValue = value.value;
            const iconUrl = GuardinProfileConstants.stats[statId].icon;
            const name = GuardinProfileConstants.stats[statId].name;

            return generateStateDetail(iconUrl, name, statValue, index);
        })
    }

    const generateBodyContent = (item, key) => {
        return (
            <View>
                <View style={[styles.mainHeader, {backgroundColor: 'gray', justifyContent: 'center'}]}>
                    {generateStats(item)}
                </View>
                <Button title="More Details..." containerStyle={{borderRadius: 0}} buttonStyle={{backgroundColor: "gray", borderRadius: 0}} />

            </View>
        );
    }

    const RenderListContent = (item, key) => {
        // debugger;
        return (
            <ListItem.Accordion
                containerStyle={{padding: 0}}
                key={key}
                content={
                    generateHeaderContent(item, key)
                }
                isExpanded={isExpanded.hasOwnProperty(key) ? isExpanded[key] : true}
            >
                <View>
                    {generateBodyContent(item, key)}
                    <Divider orientation="horizontal" width={5} color="white" />
                </View>
            </ListItem.Accordion>
        );
    }

    return (
        <View>
            <Loading isVisible={loading} />
            {renderList(characters)}
        </View>
    )
}

const styles = StyleSheet.create({
    bodyDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        justifyContent: 'center'
    },
    mainHeader: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    mainHeaderLs: {
        flexDirection: 'column',
        flex: 1,
        flexWrap: 'wrap',
        paddingLeft: '20%'
    },
    mainHeaderRs: {
        flexDirection: 'column',
        flex: 1,
        flexWrap: 'wrap',
        paddingLeft: '30%',
        paddingTop: '1%'
    },
    textBoldWhite: {
        color: 'white',
        fontWeight: 'bold',
        flex: 1,
    },
    textBoldYellow: {
        color: '#ecd971',
        fontWeight: 'bold',
        flex: 1,
    }
});

export default MembershipData;