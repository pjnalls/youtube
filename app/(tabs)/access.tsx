import { useColorScheme } from 'nativewind';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ApiKeyContext } from '@/app/_layout';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function AccessScreen() {
  const { colorScheme } = useColorScheme();
  const { apiKey, setApiKey, isValidKey, setIsValidKey } =
    useContext(ApiKeyContext);
  const handleChangeText = (key: string) => {
    setApiKey(key);
    setIsValidKey(null);
  };
  const handleButtonPress = () => {
    if (apiKey) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&maxResults=1&key=${apiKey}`,
      )
        .then(response => {
          if (response.status.toString()[0].match(/[1345]/g)) {
            setIsValidKey(false);
          } else {
            setIsValidKey(true);
          }
        })
        .catch(() => {
          setIsValidKey(false);
        });
    }
  };

  const renderStatus = () => {
    if (isValidKey === undefined) {
      return (
        <MaterialIcons
          name='arrow-back'
          color={Colors[colorScheme ?? 'light'].text}
          size={24}
        />
      );
    } else if (isValidKey === null) {
      return (
        <MaterialIcons
          name='add-circle-outline'
          color={Colors[colorScheme ?? 'light'].text}
          size={24}
        />
      );
    } else if (isValidKey) {
      return (
        <MaterialIcons
          name='check'
          color={Colors[colorScheme ?? 'light'].validColor}
          size={24}
        />
      );
    } else {
      return (
        <MaterialIcons
          name='close'
          color={Colors.both.linkColor}
          size={24}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter API key below</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <View style={styles.inputContainer}>
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
              backgroundColor:
                Colors[colorScheme ?? 'light'].textInputBackground,
              color: Colors[colorScheme ?? 'light'].textInputColor,
            },
          ]}
          onChangeText={handleChangeText}
          clearTextOnFocus={true}
          returnKeyType={'next'}
        />
        <TouchableOpacity
          onPress={handleButtonPress}
          style={[
            styles.statusButton,
            {
              backgroundColor: Colors[colorScheme ?? 'light'].validBackground,
              borderLeftWidth: 1,
              borderLeftColor: Colors[colorScheme ?? 'light'].validBorderColor,
            },
          ]}>
          {renderStatus()}
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: 'center' }}>
        Don't have a YouTube Data API key yet?{'\n'}Learn how to get one{' '}
        <Link
          href={'/(tabs)/help'}
          style={{ color: Colors.both.linkColor }}>
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
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 16,
  },
  textInput: {
    width: '70%',
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
  statusButton: {
    width: '10%',
    paddingVertical: 8,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
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
