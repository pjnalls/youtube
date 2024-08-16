import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from 'nativewind';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { View } from '@/components/Themed';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const switchOpacity = useSharedValue(0);
  const switchFadeIn = () => {
    switchOpacity.value = withTiming(1, { duration: 300 });
  };

  useEffect(() => switchFadeIn(), []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: switchOpacity.value,
  }));

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name="home" color={color} />
            ) : (
              <TabBarIcon name="home-outline" color={color} />
            ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Pressable
                onPress={() => {
                  toggleColorScheme();
                  switchOpacity.value = 0;
                  switchFadeIn();
                }}
                style={{ width: 32 }}
              >
                {({ pressed }) => (
                  <Animated.View style={animatedStyle}>
                    <FontAwesome
                      name={colorScheme === 'dark' ? 'sun-o' : 'moon-o'}
                      size={24}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  </Animated.View>
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="access"
        options={{
          title: 'Access',
          tabBarIcon: ({ color, focused }) => focused ? <TabBarIcon name="key" color={color} /> : <TabBarIcon name="key-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color, focused }) => focused ? <TabBarIcon name="information" color={color} /> : <TabBarIcon name="information-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
