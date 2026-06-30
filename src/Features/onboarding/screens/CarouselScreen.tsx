import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';
import { styles } from '../styles';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Track Your Vibe',
    description: 'Monitor your daily meals, macros, and hydration effortlessly.',
    image: require('@/assets/images/expo-logo.png'), // placeholder
  },
  {
    id: '2',
    title: 'Stay Shredded',
    description: 'Achieve your dream physique with personalized goals and insights.',
    image: require('@/assets/images/expo-logo.png'), // placeholder
  },
];

export default function CarouselScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  const handleNext = () => {
    if (activeIndex === SLIDES.length - 1) {
      router.push('/onboarding/details');
    } else {
      scrollRef.current?.scrollTo({
        x: width * (activeIndex + 1),
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={{ flex: 1 }}
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <Image source={slide.image} style={{ width: 150, height: 150, marginBottom: 40 }} />
            <Text style={[styles.title, { color: theme.text }]}>{slide.title}</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <View style={styles.dotContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot, 
                { backgroundColor: theme.border },
                activeIndex === index && { backgroundColor: theme.primary, width: 24 }
              ]}
            />
          ))}
        </View>

        <Button 
          label={activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}
