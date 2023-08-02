import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, Linking } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { View, Share } from 'react-native';
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const DetailsNews = ({ title, coverUrl, pubDate, content, live_url }) => {

    const theme = useTheme();
    const handlePress = async () => {
        await Linking.openURL(live_url);
    };
    const handleSocialConnection = async () => {
        await Linking.openURL("https://www.facebook.com/dainikishaan");
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: live_url,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <ScrollView>
            <View style={styles.headlineContainer}>
                <Text style={styles.headline} variant="headlineMedium" >
                    {title}
                </Text>
            </View>

            <Card
                style={{ backgroundColor: theme.colors.background }}
                contentStyle={{ width: Dimensions.get("window").width }}>
                {
                    coverUrl && (
                        <Card.Cover source={{ uri: coverUrl }} />)
                }
                <Card.Content>
                    <Text
                        style={{ textAlign: "left", marginVertical: 10, }}
                        variant="headlineSmall"
                        textBreakStrategy='highQuality'
                    >
                        {content}
                    </Text>
                    <Text
                        style={{ textAlign: "left", marginTop: -8 }}
                        variant="headlineSmall"
                        textBreakStrategy='highQuality'
                    >
                        প্রকাশকাল : {moment(pubDate).format("DD. MM. YYYY | h.mm A")}
                    </Text>
                    <View style={styles.actionContainer}>
                        <View style={styles.actionBtn}  >
                            <Icon color="white" size={15} name={"comment"} onPress={() => handlePress()} />
                            <Text style={styles.actionBtnText} onPress={() => handlePress()}>মন্তব্য লিখুন</Text>
                        </View>
                        <View style={styles.actionBtn}  >
                            <Text style={styles.actionBtnText} onPress={onShare}>শেয়ার করুন</Text>
                            <Icon color="white" size={23} name={"share"} onPress={onShare} />
                        </View>
                    </View>

                    <View style={styles.socialLink} >
                        <Text style={styles.socialLinkText} onPress={() => handleSocialConnection()}> Connect with :
                        </Text>
                        <Icon color="#120E43" size={22} name={"facebook"} />
                    </View>

                </Card.Content>
            </Card>
        </ScrollView>
    )
};
export default DetailsNews;

const styles = StyleSheet.create({
    headlineContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    headline: {
        color: "black",
        marginHorizontal: 14,
        marginVertical: 18,
        fontSize: 20,
        fontWeight: "600",
    },
    actionContainer: {
        flexDirection: "row",
        gap: 6,
        marginTop: 15,
    },
    actionBtn: {
        backgroundColor: "#207398",
        paddingHorizontal: 4,
        paddingVertical: 9,
        width: 170,
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
        borderRadius: 6,
        textAlign: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    actionBtnText: {
        marginLeft: 5,
        color: "white",
        fontWeight: "bold",
        paddingHorizontal: 10
    },
    socialLink: {
        flexDirection: "row",
        backgroundColor: "#CAD5E2",
        justifyContent: "center",
        paddingVertical: 8,
        marginTop: 20,
        borderRadius: 2
    },
    socialLinkText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#120E43',
        paddingLeft: 20,
        paddingRight: 10,
    },
})