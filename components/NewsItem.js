import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import moment from "moment";

const NewsItem = ({ title, content, subtitle, navigation, pubDate, featured_media_id, coverUrl2, live_url, handleDelete }) => {

    const [coverUrl, setCoverUrl] = useState("");
    const theme = useTheme();
    const removeHtmlTags = (str) => {
        return str.replace(/<[^>]+>/g, '');
    };
    const subtitleWitinTags = removeHtmlTags(subtitle);
    // getting the cover photo url from another API call
    const getImageUrl = async () => {
        const url = `https://dainikishan.com/wp-json/wp/v2/media/${featured_media_id}?_fields=source_url`;
        try {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => setCoverUrl(data.source_url))
        } catch (error) { console.log(error) }
    };
    useEffect(() => {
        getImageUrl();
    }, []);
    const handlePress = () => {
        navigation.navigate('NewsOverView', { title: title, subtitle: subtitle, content: content, coverUrl: coverUrl || coverUrl2, navigation: navigation, pubDate: pubDate, live_url: live_url })
    };

    return (
        <Pressable onPress={handlePress}>
            <Card style={{ marginBottom: 15, paddingBottom: 15, backgroundColor: theme.colors.elevation.level5, }}>
                <Card.Cover borderRadius={1} source={{ uri: coverUrl || coverUrl2 }} />
                <Card.Title title={title} subtitle={subtitleWitinTags} titleNumberOfLines={1} subtitleNumberOfLines={2} />
                <View style={styles.actionContainer}>
                    <View>
                        <Text style={styles.pubDate}> {moment(pubDate).format("DD. MM. YYYY | h.mm A")}</Text>
                    </View>
                    {
                        handleDelete &&
                        <TouchableOpacity  >
                            <Text style={styles.deleteBtn} onPress={() => handleDelete(title)}>Delete</Text>
                        </TouchableOpacity>
                    }
                </View>
            </Card>
        </Pressable>
    )
};
export default NewsItem;

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 0.2,
        shadowOpacity: 0.2,
        shadowColor: "gray"
    },
    pubDate: {
        width: 180,
        marginLeft: 10,
    },
    deleteBtn: {
        backgroundColor: "#EDBF69",
        paddingHorizontal: 8,
        paddingVertical: 8,
        width: 160,
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        borderRadius: 6,
        textAlign: "center",
        marginTop: 10,
        marginRight: 10,
    },
});