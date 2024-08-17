import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ExternalLink } from '@/components/ExternalLink';

export default function HelpScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Getting access to this app</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<Text>
				To get access to this app you'll need an API key for the YouTube Data
				API. Instructions are available{' '}
				<ExternalLink href='https://developers.google.com/youtube/v3/getting-started'>
					here
				</ExternalLink>{' '}
				for how to get started with API and how to get a key for it.{'\n\n'}It's
				highly recommended that you restrict your API key once you generate one.
				There are some brief instructions for restricting API keys which you can
				find{' '}
				<ExternalLink href='https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions'>
					here
				</ExternalLink>
				.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		padding: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
