import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
	const { colorScheme } = useColorScheme();
	const [searchTerm, setSearchTerm] = useState('');
	const handleChangeText = (term: string) => {
		const alphanumericOnly = term.replace(/[^a-zA-Z0-9]/g, '');
		setSearchTerm(alphanumericOnly);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Home</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>

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
						backgroundColor: Colors[colorScheme ?? 'light'].textInputBackground,
						color: Colors[colorScheme ?? 'light'].textInputColor,
					},
				]}
				onChangeText={handleChangeText}
				returnKeyType={'search'}
			></TextInput>
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
