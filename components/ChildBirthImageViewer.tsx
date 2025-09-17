
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Dimensions,
  StyleSheet 
} from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface ChildBirthImageViewerProps {
  visible: boolean;
  onClose: () => void;
}

const ChildBirthImageViewer: React.FC<ChildBirthImageViewerProps> = ({ visible, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Images in numerical order based on filename (3, 9, 9c, c8)
  const images = [
    {
      id: 1,
      source: require('../assets/images/3b485d7c-e44c-4909-9bb7-5592532999e2.jpeg'),
      title: 'Child Birth Protocol - Page 1'
    },
    {
      id: 2,
      source: require('../assets/images/964fb457-0ca8-4875-a022-375092942958.jpeg'),
      title: 'Child Birth Protocol - Page 2'
    },
    {
      id: 3,
      source: require('../assets/images/9c102192-8a98-431f-a658-390ad767d161.jpeg'),
      title: 'Child Birth Protocol - Page 3'
    },
    {
      id: 4,
      source: require('../assets/images/c806a230-91d5-4a18-b3bd-85e7d3a1099a.jpeg'),
      title: 'Child Birth Protocol - Page 4'
    }
  ];

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} style={{ color: colors.text }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {images[currentImageIndex].title}
          </Text>
          <View style={styles.pageIndicator}>
            <Text style={styles.pageText}>
              {currentImageIndex + 1} / {images.length}
            </Text>
          </View>
        </View>

        {/* Image Display */}
        <ScrollView 
          style={styles.imageContainer}
          contentContainerStyle={styles.imageContentContainer}
          maximumZoomScale={3}
          minimumZoomScale={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Image
            source={images[currentImageIndex].source}
            style={[
              styles.image,
              {
                width: screenWidth - 32,
                height: (screenWidth - 32) * 1.3, // Adjust aspect ratio as needed
              }
            ]}
            resizeMode="contain"
          />
        </ScrollView>

        {/* Navigation Controls */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            onPress={goToPreviousImage} 
            style={styles.navButton}
            disabled={images.length <= 1}
          >
            <Icon name="chevron-back" size={24} style={{ color: colors.background }} />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={goToNextImage} 
            style={styles.navButton}
            disabled={images.length <= 1}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <Icon name="chevron-forward" size={24} style={{ color: colors.background }} />
          </TouchableOpacity>
        </View>

        {/* Page Dots */}
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToImage(index)}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentImageIndex 
                    ? colors.secondary 
                    : colors.textSecondary + '40'
                }
              ]}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBackground,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
  },
  pageIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
  },
  pageText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
  },
  imageContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  navButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default ChildBirthImageViewer;
