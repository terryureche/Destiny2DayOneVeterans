import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loading = ({isVisible, design = {color: '#C0C0C0', size: 'large'}}) => {
    return (
        <View>
            {isVisible ?
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={design.size} color={design.color} />
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        justifyContent: "center",
        height: '100%'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default Loading;