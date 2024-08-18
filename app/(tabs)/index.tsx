import { useColorScheme } from 'nativewind';
import { useContext, useEffect, useState } from 'react';
import {
	FlatList,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from 'react-native';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { ApiKeyContext } from '@/app/_layout';
import VideoSnippet from '@/components/VideoSnippet';
import { VideoDetails } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
	const { colorScheme } = useColorScheme();
	const [searchTerm, setSearchTerm] = useState('');
	const [videos, setVideos] = useState<VideoDetails[]>();
	const { apiKey, timeAgo } = useContext(ApiKeyContext);

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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Home</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<View style={styles.inputContainer}>
				<TextInput
					textContentType='none'
					placeholder='Search YouTube'
					placeholderTextColor={
						Colors[colorScheme ?? 'light'].textInputPlaceholderColor
					}
					selectionColor={Colors.both.textInputSelectionColor}
					style={[
						styles.textInput,
						{
							backgroundColor:
								Colors[colorScheme ?? 'light'].textInputBackground,
							color: Colors[colorScheme ?? 'light'].textInputColor,
						},
					]}
					onChangeText={handleChangeText}
					returnKeyType={'search'}
				></TextInput>
				<TouchableOpacity
					onPress={handleButtonPress}
					style={[
						styles.searchButton,
						{
							backgroundColor: Colors[colorScheme ?? 'light'].validBackground,
							borderLeftWidth: 1,
							borderLeftColor: Colors[colorScheme ?? 'light'].validBorderColor,
						},
					]}
				>
					{
						<MaterialIcons
							name='search'
							color={Colors[colorScheme ?? 'light'].text}
							size={24}
						/>
					}
				</TouchableOpacity>
			</View>
			<ScrollView style={{ height: '60%', width: '100%' }}>
				{videos ? (
					<FlatList
						style={{ height: '100%', width: '100%' }}
						data={[...videos]}
						keyExtractor={item => item.id.videoId.toString()}
						renderItem={({ item }) => {
							const time =
								timeAgo.format(new Date(item.snippet.publishedAt)) ?? '';
							return (
								<View style={{ marginBottom: 4, marginTop: 4 }}>
									<VideoSnippet
										videoDetails={item}
										timeAgo={time}
									/>
								</View>
							);
						}}
					/>
				) : (
					<Text style={{ textAlign: 'center' }}>No results shown.</Text>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
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
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
