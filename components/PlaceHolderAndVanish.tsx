import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Canvas, Circle, Group, useCanvasRef } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, AppState } from 'react-native';
import { Svg, Line, Path } from 'react-native-svg';
import { Icon } from './ui/icon';
import { Search } from 'lucide-react-native';

// Using standard TouchableOpacity from React Native instead of gesture-handler
// to avoid the GestureHandlerRootView requirement

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (text: string) => void;
  onSubmit: () => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState('');
  const [animating, setAnimating] = useState(false);
  const [pixels, setPixels] = useState<Array<{x: number, y: number, r: number, color: string}>>([]);
  
  const inputRef = useRef<TextInput>(null);
  const canvasRef = useCanvasRef();
  const animationRef = useRef<number | null>(null);
  const placeholderOpacity = useRef(new Animated.Value(1)).current;
  const placeholderPosition = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const screenWidth = Dimensions.get('window').width;
  const canvasWidth = screenWidth;
  const canvasHeight = 60;

  // Handle placeholder rotation
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      // Animate placeholder out
      Animated.parallel([
        Animated.timing(placeholderOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderPosition, {
          toValue: -15,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        placeholderPosition.setValue(5);
        // Animate new placeholder in
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(placeholderPosition, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start();
      });
    }, 3000);
  };

  // Handle app state changes (similar to visibility changes in web)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active' && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (state === 'active' && !intervalRef.current) {
        startAnimation();
      }
    });

    startAnimation();
    
    return () => {
      subscription.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [placeholders]);

  // Get text dimensions and create pixel data
  const generatePixelData = useCallback(() => {
    if (!value) return;
    
    // Since we can't directly get pixel data from text in React Native,
    // we'll create a simplified version based on character positions
    const newPixels = [];
    const textLength = value.length;
    const baseX = 20;
    const baseY = 30;
    const pixelSize = 1;
    
    // Generate random pixels around each character position
    for (let i = 0; i < textLength; i++) {
      const charX = baseX + i * 10;
      
      // Create several pixels for each character
      for (let j = 0; j < 15; j++) {
        const offsetX = Math.random() * 10 - 5;
        const offsetY = Math.random() * 10 - 5;
        
        newPixels.push({
          x: charX + offsetX,
          y: baseY + offsetY,
          r: 1 + Math.random(),
          color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
        });
      }
    }
    
    setPixels(newPixels);
  }, [value, isDarkMode]);

  useEffect(() => {
    if (!animating) {
      generatePixelData();
    }
  }, [value, generatePixelData, animating]);

  // Animation loop for the vanishing effect
  const animate = useCallback(() => {
    let animationId: number;
    
    const animateFrame = (pos = canvasWidth) => {
      const newPixels = pixels.filter(pixel => {
        // Only keep pixels that haven't vanished yet
        if (pixel.x < pos && pixel.r > 0) {
          // Update pixel properties
          pixel.x += Math.random() > 0.5 ? 1 : -1;
          pixel.y += Math.random() > 0.5 ? 1 : -1;
          pixel.r -= 0.05 * Math.random();
          return true;
        }
        return pixel.r > 0;
      });
      
      setPixels(newPixels);
      
      if (newPixels.length > 0) {
        animationId = requestAnimationFrame(() => animateFrame(pos - 8));
      } else {
        setValue('');
        setAnimating(false);
      }
    };
    
    animationId = requestAnimationFrame(() => animateFrame());
    animationRef.current = animationId;
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [pixels, canvasWidth]);

  const vanishAndSubmit = () => {
    if (!value || animating) return;
    
    setAnimating(true);
    generatePixelData();
    
    // Start the animation in the next frame
    requestAnimationFrame(() => {
      animate();
    });
    
    // Call the onSubmit callback
    onSubmit();
  };

  const handleSubmitEditing = () => {
    vanishAndSubmit();
  };

  return (
    <View style={styles.container}>
      <View 
      className='bg-white w-[100%] h-16 rounded-2xl overflow-hidden flex-row px-4 items-center relative border-2 border-gray-300'
      >
        {/* Canvas for animation */}
        {animating && (
          <Canvas style={[styles.canvas, { opacity: animating ? 1 : 0 }]} ref={canvasRef}>
            <Group>
              {pixels.map((pixel, index) => (
                <Circle 
                  key={index}
                  cx={pixel.x} 
                  cy={pixel.y} 
                  r={pixel.r} 
                  color={pixel.color} 
                />
              ))}
            </Group>
          </Canvas>
        )}

        <Icon as={Search} className=' h-6 w-6 stroke-orange-500 stroke-2'/>
        
        {/* Placeholder Animation */}
        {!value && (
          <Animated.Text
            style={[
              styles.placeholder,
              { 
                opacity: placeholderOpacity,
                transform: [{ translateY: placeholderPosition }],
                color: isDarkMode ? '#71717a' : '#737373' 
              }
            ]}
          >
            Search for '{placeholders[currentPlaceholder]}'
          </Animated.Text>
        )}
        
      </View>
      {/* <StatusBar style={isDarkMode ? 'light' : 'dark'} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 600,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  inputFilled: {
    backgroundColor: '#f9fafb',
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    zIndex: 1,
  },
  transparentText: {
    color: 'transparent',
  },
  placeholder: {
    position: 'absolute',
    left: 44,
    fontSize: 18,
    fontWeight: 'semibold',
    zIndex: 0,
  },
  submitButton: {
    position: 'absolute',
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
});

export function PlaceholdersAndVanishInput2({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (text: string) => void;
  onSubmit: () => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState('');
  const [animating, setAnimating] = useState(false);
  const [pixels, setPixels] = useState<Array<{x: number, y: number, r: number, color: string}>>([]);
  
  const inputRef = useRef<TextInput>(null);
  const canvasRef = useCanvasRef();
  const animationRef = useRef<number | null>(null);
  const placeholderOpacity = useRef(new Animated.Value(1)).current;
  const placeholderPosition = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const screenWidth = Dimensions.get('window').width;
  const canvasWidth = screenWidth;
  const canvasHeight = 60;

  // Handle placeholder rotation
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      // Animate placeholder out
      Animated.parallel([
        Animated.timing(placeholderOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderPosition, {
          toValue: -15,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        placeholderPosition.setValue(5);
        // Animate new placeholder in
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(placeholderPosition, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start();
      });
    }, 3000);
  };

  // Handle app state changes (similar to visibility changes in web)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active' && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (state === 'active' && !intervalRef.current) {
        startAnimation();
      }
    });

    startAnimation();
    
    return () => {
      subscription.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [placeholders]);

  // Get text dimensions and create pixel data
  const generatePixelData = useCallback(() => {
    if (!value) return;
    
    // Since we can't directly get pixel data from text in React Native,
    // we'll create a simplified version based on character positions
    const newPixels = [];
    const textLength = value.length;
    const baseX = 20;
    const baseY = 30;
    const pixelSize = 1;
    
    // Generate random pixels around each character position
    for (let i = 0; i < textLength; i++) {
      const charX = baseX + i * 10;
      
      // Create several pixels for each character
      for (let j = 0; j < 15; j++) {
        const offsetX = Math.random() * 10 - 5;
        const offsetY = Math.random() * 10 - 5;
        
        newPixels.push({
          x: charX + offsetX,
          y: baseY + offsetY,
          r: 1 + Math.random(),
          color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
        });
      }
    }
    
    setPixels(newPixels);
  }, [value, isDarkMode]);

  useEffect(() => {
    if (!animating) {
      generatePixelData();
    }
  }, [value, generatePixelData, animating]);

  // Animation loop for the vanishing effect
  const animate = useCallback(() => {
    let animationId: number;
    
    const animateFrame = (pos = canvasWidth) => {
      const newPixels = pixels.filter(pixel => {
        // Only keep pixels that haven't vanished yet
        if (pixel.x < pos && pixel.r > 0) {
          // Update pixel properties
          pixel.x += Math.random() > 0.5 ? 1 : -1;
          pixel.y += Math.random() > 0.5 ? 1 : -1;
          pixel.r -= 0.05 * Math.random();
          return true;
        }
        return pixel.r > 0;
      });
      
      setPixels(newPixels);
      
      if (newPixels.length > 0) {
        animationId = requestAnimationFrame(() => animateFrame(pos - 8));
      } else {
        setValue('');
        setAnimating(false);
      }
    };
    
    animationId = requestAnimationFrame(() => animateFrame());
    animationRef.current = animationId;
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [pixels, canvasWidth]);

  const vanishAndSubmit = () => {
    if (!value || animating) return;
    
    setAnimating(true);
    generatePixelData();
    
    // Start the animation in the next frame
    requestAnimationFrame(() => {
      animate();
    });
    
    // Call the onSubmit callback
    onSubmit();
  };

  const handleSubmitEditing = () => {
    vanishAndSubmit();
  };

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.inputContainer, 
          { backgroundColor: isDarkMode ? '#27272a' : '#ffffff' },
          value ? styles.inputFilled : null
        ]}
      >
        {/* Canvas for animation */}
        {animating && (
          <Canvas style={[styles.canvas, { opacity: animating ? 1 : 0 }]} ref={canvasRef}>
            <Group>
              {pixels.map((pixel, index) => (
                <Circle 
                  key={index}
                  cx={pixel.x} 
                  cy={pixel.y} 
                  r={pixel.r} 
                  color={pixel.color} 
                />
              ))}
            </Group>
          </Canvas>
        )}
        
        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={[
            styles.input, 
            { color: isDarkMode ? '#ffffff' : '#000000' },
            animating ? styles.transparentText : null
          ]}
          value={value}
          onChangeText={(text) => {
            if (!animating) {
              setValue(text);
              onChange(text);
            }
          }}
          onSubmitEditing={handleSubmitEditing}
        />
        
        {/* Placeholder Animation */}
        {!value && (
          <Animated.Text
            style={[
              styles.placeholder,
              { 
                opacity: placeholderOpacity,
                transform: [{ translateY: placeholderPosition }],
                color: isDarkMode ? '#71717a' : '#737373' 
              }
            ]}
          >
            {placeholders[currentPlaceholder]}
          </Animated.Text>
        )}
        
        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { 
              backgroundColor: isDarkMode ? '#18181b' : '#000000',
              opacity: value && !animating ? 1 : 0.5 
            }
          ]}
          disabled={!value || animating}
          onPress={vanishAndSubmit}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" stroke={isDarkMode ? '#71717a' : '#d1d5db'} strokeWidth={2}>
            <Line x1="5" y1="12" x2="19" y2="12" />
            <Path d="M13 18l6 -6" />
            <Path d="M13 6l6 6" />
          </Svg>
        </TouchableOpacity>
      </View>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}