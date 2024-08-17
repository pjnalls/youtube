import { useColorScheme } from 'nativewind';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { ApiKeyContext } from '@/app/_layout';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function AccessScreen() {
	const { colorScheme } = useColorScheme();
	const { setApiKey } = useContext(ApiKeyContext);
	const handleTextInputChange = (key: string) => {
		setApiKey(key);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Gain access to the app here</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<TextInput
				textContentType='password'
				secureTextEntry={true}
				placeholder='YouTube Data API key here'
				placeholderTextColor={
					Colors[colorScheme ?? 'light'].textInputPlaceholderColor
				}
				selectionColor={Colors.both.textInputSelectionColor}
				style={[
					styles.textInput,
					{
						backgroundColor: Colors[colorScheme ?? 'light'].textInputBackground,
						color: Colors[colorScheme ?? 'light'].textInputColor,
					},
				]}
				onChangeText={handleTextInputChange}
			></TextInput>
			<Text style={{ textAlign: 'center' }}>
				Don't have a YouTube Data API key yet?{'\n'}Learn how to get one{' '}
				<Link
					href={'/(tabs)/help'}
					style={{ color: Colors.both.linkColor }}
				>
					here
				</Link>
				.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		maxWidth: 720,
		width: '100%',
		padding: 16,
	},
	textInput: {
		width: '80%',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 50,
		marginBottom: 16,
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
