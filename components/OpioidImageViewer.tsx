
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

interface OpioidImageViewerProps {
  visible: boolean;
  onClose: () => void;
}

const OpioidImageViewer: React.FC<OpioidImageViewerProps> = ({ visible, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Images ordered by M-XX page labels (M-34, M-35, M-36, M-37, M-38)
  const images = [
    {
      id: 1,
      source: require('../assets/images/09ea2f54-b846-4770-837b-f26f2970e4da.jpeg'),
      title: 'Opioid Protocol - M-34',
      pageLabel: 'M-34'
    },
    {
      id: 2,
      source: require('../assets/images/8cd9344a-d2ec-4e88-9f9d-47ce58b68772.jpeg'),
      title: 'Opioid Protocol - M-35',
      pageLabel: 'M-35'
    },
    {
      id: 3,
      source: require('../assets/images/54a61d10-c78d-4762-8a70-8f9b6f6df87b.jpeg'),
      title: 'Opioid Protocol - M-36',
      pageLabel: 'M-36'
    },
    {
      id: 4,
      source: require('../assets/images/7d72c3b9-5547-4ce3-aa07-4f44c6fe9b3d.jpeg'),
      title: 'Opioid Protocol - M-37',
      pageLabel: 'M-37'
    },
    {
      id: 5,
      source: require('../assets/images/30747601-2861-4967-8e38-3806bc0c2105.jpeg'),
      title: 'Opioid Protocol - M-38',
      pageLabel: 'M-38'
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
              {images[currentImageIndex].pageLabel}
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
                    ? '#FF6B35' 
                    : colors.textSecondary + '40'
                }
              ]}
            />
          ))}
        </View>

        {/* Page Labels */}
        <View style={styles.pageLabelsContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToImage(index)}
              style={[
                styles.pageLabel,
                {
                  backgroundColor: index === currentImageIndex 
                    ? '#FF6B35' 
                    : colors.cardBackground
                }
              ]}
            >
              <Text style={[
                styles.pageLabelText,
                {
                  color: index === currentImageIndex 
                    ? colors.background 
                    : colors.textSecondary
                }
              ]}>
                {image.pageLabel}
              </Text>
            </TouchableOpacity>
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
    backgroundColor: '#FF6B35',
    borderRadius: 12,
  },
  pageText: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '600',
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
    backgroundColor: '#FF6B35',
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
    paddingBottom: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pageLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 16,
    gap: 8,
  },
  pageLabel: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 50,
    alignItems: 'center',
  },
  pageLabelText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default OpioidImageViewer;
