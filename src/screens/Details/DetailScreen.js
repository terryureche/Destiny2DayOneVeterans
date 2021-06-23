import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {BottomSheet, ListItem, Button, Avatar, Icon, getIconType} from 'react-native-elements';
import {getMembershipDataById, getSummaryProfile} from './../../api/Bungi';
// import {Context as ProfileContext} from './../../context/ProfileContext';
import Guardians from './../../components/Guardians/GuardiansList';

const DetailScreen = ({route, navigation}) => {
    const [primaryMembership, setPrimaryMembership] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [membershipUsersList, setMembershipUsersList] = useState([]);
    // const {state, change} = useContext(ProfileContext);

    const profileId = route.params.profileId;

    const summaryProfile = async (profileId) => {
        try {
            const rawData = await getMembershipDataById(profileId);
            const primaryMembershipId = rawData.data.Response.primaryMembershipId;
            const destinyMemberships = rawData.data.Response.destinyMemberships;

            generateMembershipUsers(destinyMemberships, primaryMembershipId);
        } catch (e) {
            setPrimaryMembership({});
        }
    }

    useEffect(() => {
        summaryProfile(profileId);
    }, []);

    const generateMembershipUsers = (destinyMemberships, primaryMembership) => {
        const cancel = {
            title: 'Cancel',
            onPress: () => setIsVisible(false),
        };

        var members = destinyMemberships.map((member) => {
            if (!primaryMembership || (member.membershipId === primaryMembership)) {
                setPrimaryMembership({
                    id: member.membershipId,
                    type: member.membershipType
                });
            }

            const isPublic = member.isPublic;

            const profileVisibility = !isPublic ? " (Profile is not public) " : " (Public profile)";
            const title = member.displayName + profileVisibility;

            const inconPath = member.iconPath || "/img/theme/bungienet/icons/xboxLiveLogo.png";
            const iconUrl = 'https://www.bungie.net' + inconPath;

            return {
                title,
                iconUrl,
                onPress: () => {
                    setIsVisible(false);

                    if (!isPublic) {
                        return;
                    }

                    setPrimaryMembership({
                        id: member.membershipId,
                        type: member.membershipType,
                    });
                }
            }
        });

        if (members.length === 0) {
            members.push({
                title: 'No user available',
                onPress: () => setIsVisible(false),
            });
        }

        const list = [...members, cancel];

        setMembershipUsersList(list);
    };

    const getIcon = (membershipUsersList, item, index) => {
        if (membershipUsersList.length === 0 || membershipUsersList.length - 1 === index) {
            return <Icon name={"clear"} />;
        }

        return (<Avatar source={{uri: item.iconUrl}} />);
    }

    return (
        <View>
            <Button
                onPress={() => {
                    setIsVisible(true)
                }}
                title="Select Platform"
            />
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
            >
                {membershipUsersList.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress} bottomDivider>
                        {getIcon(membershipUsersList, l, i)}
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>
                                {l.title}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
            <ScrollView>
                <Guardians membershipUsersList={membershipUsersList} primaryMembership={primaryMembership} />
            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: 30,
        height: 30,
        margin: 0,
        borderRadius: 5,
        // marginLeft: 30
    }
});

export default DetailScreen;