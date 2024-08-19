import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useContext, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { ApiKeyContext } from '@/app/_layout';
import VideoSnippet from '@/components/VideoSnippet';
import { VideoDetails } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

export default function HomeScreen() {
	const { colorScheme } = useColorScheme();
	const [searchTerm, setSearchTerm] = useState('');
	const [videos, setVideos] = useState<VideoDetails[]>();
	const [videoId, setVideoId] = useState('');
	const { apiKey, isValidKey, timeAgo } = useContext(ApiKeyContext);

	const handleChangeText = (term: string) => {
		setSearchTerm(term);
	};
	const handleButtonPress = () => {
		fetch(
			`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURI(searchTerm)}&type=video&key=${apiKey}`,
		)
			.then(response => response.json())
			.then(({ items }) => {
				setVideos(items);
			})
			.catch(error => console.error(error));
	};
	const handleThumbnailPress = (id: string) => {
		setVideoId('');
		setTimeout(() => {
			setVideoId(id);
		}, 1000);
	};

	return (
		<View style={styles.container}>
			{videoId ? (
				<YouTubePlayer
					width={360}
					height={203}
					videoId={videoId}
				/>
			) : (
				<View
					style={{
						width: 360,
						height: 203,
						backgroundColor: Colors[colorScheme ?? 'light'].textInputBackground,
					}}
				></View>
			)}
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<View style={styles.inputContainer}>
				<TextInput
					editable={!!isValidKey}
					textContentType='none'
					placeholder={!!isValidKey ? 'Search YouTube' : "Can't search yet"}
					placeholderTextColor={
						!!isValidKey
							? Colors[colorScheme ?? 'light'].textInputPlaceholderColor
							: Colors[colorScheme ?? 'light'].textInputInvalidColor
					}
					selectionColor={Colors.both.textInputSelectionColor}
					style={[
						styles.textInput,
						!!isValidKey
							? {
									backgroundColor:
										Colors[colorScheme ?? 'light'].textInputBackground,
									color: Colors[colorScheme ?? 'light'].textInputColor,
								}
							: {
									backgroundColor:
										Colors[colorScheme ?? 'light'].textInputInvalidBackground,
									color: Colors[colorScheme ?? 'light'].textInputInvalidColor,
								},
					]}
					onChangeText={handleChangeText}
					returnKeyType={'search'}
				/>
				<TouchableOpacity
					onPress={() => {
						if (!!isValidKey) {
							handleButtonPress();
						} else {
							router.navigate('/(tabs)/access');
						}
					}}
					style={[
						styles.searchButton,
						!!isValidKey
							? {
									backgroundColor:
										Colors[colorScheme ?? 'light'].validBackground,
									borderLeftColor:
										Colors[colorScheme ?? 'light'].validBorderColor,
								}
							: {
									backgroundColor:
										Colors[colorScheme ?? 'light'].textInputInvalidBackground,
									borderLeftColor:
										Colors[colorScheme ?? 'light'].validBorderColor,
								},
						{ borderLeftWidth: 1 },
					]}
				>
					{!!isValidKey ? (
						<MaterialIcons
							name='search'
							color={Colors[colorScheme ?? 'light'].text}
							size={24}
						/>
					) : (
						<MaterialIcons
							name='api'
							color={Colors.both.linkColor}
							size={21}
						/>
					)}
				</TouchableOpacity>
			</View>
			{videos ? (
				<FlatList
					scrollEnabled={true}
					style={{ height: '60%', width: '100%' }}
					data={[...videos]}
					keyExtractor={item => item.id.videoId.toString()}
					renderItem={({ item }) => {
						const time =
							timeAgo.format(new Date(item.snippet.publishedAt)) ?? '';
						return (
							<TouchableOpacity
								style={{ marginBottom: 4, marginTop: 4 }}
								onPress={() => {
									handleThumbnailPress(item.id.videoId);
								}}
							>
								<VideoSnippet
									videoDetails={item}
									timeAgo={time}
								/>
							</TouchableOpacity>
						);
					}}
				/>
			) : (
				<Text style={{ textAlign: 'center' }}>
					{!!isValidKey ? (
						'No results shown.'
					) : (
						<Text>
							Go to{' '}
							<Link
								to={'/access'}
								style={{ color: Colors.both.linkColor }}
							>
								🔑 Access
							</Link>{' '}
							tab and enter YouTube Data API key.{'\n\n'}
							Get help{' '}
							<Link
								to={'/help'}
								style={{ color: Colors.both.linkColor }}
							>
								here
							</Link>
							.
						</Text>
					)}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		padding: 16,
		maxWidth: 720,
		width: '100%',
	},
	inputContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		marginBottom: 16,
	},
	searchButton: {
		width: '10%',
		paddingVertical: 8,
		borderBottomRightRadius: 50,
		borderTopRightRadius: 50,
		alignItems: 'center',
	},
	textInput: {
		width: '70%',
		height: 40,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderBottomLeftRadius: 50,
		borderTopLeftRadius: 50,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 16,
		height: 1,
		width: '80%',
	},
});
