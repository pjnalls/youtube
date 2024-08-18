import React, { useState, useCallback } from 'react';
import { Button, View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function YoutubeEmbed({ videoId }: { videoId: string }) {
	const [playing, setPlaying] = useState(false);

	const onStateChange = useCallback((state: string) => {
		if (state === 'ended') {
			setPlaying(false);
			Alert.alert('video has finished playing!');
		}
	}, []);

	const togglePlaying = useCallback(() => {
		setPlaying(prev => !prev);
	}, []);

	return (
		<View>
			<YoutubePlayer
				height={203}
				play={playing}
				videoId={videoId}
				onChangeState={onStateChange}
			/>
		</View>
	);
}
