import React, {useState, useEffect} from 'react';
import GuardinProfileConstants from './../../utils/DestinyEnums/GuardinProfileEnums';
import {getPublicMilestones, getManifest, basicBungieGet} from './../../api/Bungi';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {ListItem, Icon, Avatar, Text} from 'react-native-elements';
import Loading from '../Utils/Loading/Loading';

const PublicMilestones = () => {
    const [milestones, setMilestones] = useState({});
    const [loading, setLoading] = useState(true);

    const getMilestones = async () => {
        try {
            const milestonesDef = await getMilestonesDef();
            const milestonesMetaRaw = await getPublicMilestones();

            const milestonesData = resolveMilestones(milestonesDef, milestonesMetaRaw);

            setLoading(false);
            debugger;
            setMilestones(milestonesData);
        } catch (e) {
            setLoading(false);
            console.log(e);
            //todo: handle in the future
        }
    }

    const getMilestonesDef = async () => {
        const rawManifest = await getManifest(); //todo move on app context
        const milestonesDefShortUrl = rawManifest.data.Response.jsonWorldComponentContentPaths.en.DestinyMilestoneDefinition;
        const milestonesDefUrl = GuardinProfileConstants.urls.bungi + milestonesDefUrl;
        const milestonesDef = await basicBungieGet(milestonesDefShortUrl);

        return milestonesDef;
    }

    const resolveMilestones = (milestonesDef, milestonesMeta) => {
        let milestones = [];

        const miDef = milestonesDef.data;
        const miMetaResp = milestonesMeta.data.Response;

        for (let milestonCode in miMetaResp) {
            let detailedMileston = miDef[milestonCode];
            detailedMileston['_originalCode'] = milestonCode

            if (detailedMileston.hasOwnProperty('rewards')) {
                milestones.unshift(detailedMileston);
            } else {
                milestones.push(detailedMileston);
            }

        }

        return milestones;
    }

    useEffect(() => {
        getMilestones();
    }, []);

    return (
        <>
            <Loading isVisible={loading} />
        </>
    )
}

const styles = StyleSheet.create({});

export default PublicMilestones;