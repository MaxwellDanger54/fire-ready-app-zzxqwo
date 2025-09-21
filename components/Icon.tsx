
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  style?: object;
  color?: string;
}

export default function Icon({ name, size = 40, style, color }: IconProps) {
  // Extract color from style if provided, otherwise use the color prop or default to white
  const iconColor = style && typeof style === 'object' && 'color' in style 
    ? (style as any).color 
    : color || 'white';

  // Remove color from container style to avoid conflicts
  const containerStyle = style && typeof style === 'object' && 'color' in style
    ? { ...style, color: undefined }
    : style;

  return (
    <View style={[styles.iconContainer, containerStyle]}>
      <Ionicons name={name} size={size} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
