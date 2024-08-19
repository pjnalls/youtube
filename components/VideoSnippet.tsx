import { useColorScheme } from 'nativewind';
import { Image, Platform, StyleSheet, Text } from 'react-native';

import { View } from './Themed';

import Colors from '@/constants/Colors';

type VideoDetails = {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
  };
};

export default function VideoSnippet({
  videoDetails,
  timeAgo,
}: {
  videoDetails: VideoDetails;
  timeAgo: string;
}) {
  const { colorScheme } = useColorScheme();

  const { channelTitle, title, description, thumbnails } = videoDetails.snippet;
  const { url, width, height } = thumbnails.high;

  return (
    <View style={styles.container}>
      <View style={{ width: '34%' }}>
        <Image
          source={{ uri: url }}
          style={{
            width: '100%',
            height: Platform.OS === 'web' ? height / 2 : height / 3.5,
          }}
        />
      </View>
      <View style={{ width: '66%' }}>
        <Text
          style={[
            styles.title,
            { color: Colors[colorScheme ?? 'light'].text },
          ]}>
          {title}
        </Text>
        <Text
          style={{
            color: Colors[colorScheme ?? 'light'].videoDetailsColor,
            fontSize: 12,
            marginBottom: 8,
          }}>
          {timeAgo}
        </Text>
        <Text
          style={{
            color: Colors[colorScheme ?? 'light'].videoDetailsColor,
            fontSize: 12,
            marginBottom: 8,
          }}>
          {channelTitle}
        </Text>
        <Text
          style={{
            color: Colors[colorScheme ?? 'light'].videoDetailsColor,
            fontSize: 12,
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 400,
  },
});
