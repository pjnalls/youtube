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
				for how to get one. It's highly recommended that you restrict your API
				key which you can find out how to do{' '}
				<ExternalLink href='https://developers.google.com/youtube/registering_an_application#:~:text=If%20the%20API%20key%20that,selecting%20one%20of%20the%20Restrictions.'>
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
