
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert, Dimensions } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface FireHall {
  stationNumber: string;
  name: string;
  address: string;
}

interface OtherLocation {
  name: string;
  address: string;
  searchQuery: string;
}

interface FuelYard {
  name: string;
  address: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function FireHalls() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('North');

  // Fire halls data with addresses matching Google Maps search results for "Toronto Fire Station [number]"
  const fireHalls = {
    North: [
      // 11 District
      { stationNumber: '111', name: 'Fire Station 111', address: '3300 Bayview Ave, North York, ON M2M 4J5, Canada' },
      { stationNumber: '112', name: 'Fire Station 112', address: '5700 Bathurst St, North York, ON M2R 1W8, Canada' },
      { stationNumber: '113', name: 'Fire Station 113', address: '700 Seneca Hill Dr, North York, ON M2J 4S2, Canada' },
      { stationNumber: '114', name: 'Fire Station 114', address: '1315 Lawrence Ave W, North York, ON M6L 1A3, Canada' },
      { stationNumber: '115', name: 'Fire Station 115', address: '3415 Bathurst St, North York, ON M6A 2C4, Canada' },
      // 12 District
      { stationNumber: '121', name: 'Fire Station 121', address: '1750 Finch Ave E, North York, ON M2J 2X5, Canada' },
      { stationNumber: '122', name: 'Fire Station 122', address: '5050 Yonge St, North York, ON M2N 5N1, Canada' },
      { stationNumber: '123', name: 'Fire Station 123', address: '1750 Steeles Ave E, North York, ON M2M 3Y4, Canada' },
      { stationNumber: '124', name: 'Fire Station 124', address: '3945 Don Mills Rd, North York, ON M2H 3N1, Canada' },
      // 13 District
      { stationNumber: '131', name: 'Fire Station 131', address: '2895 Bayview Ave, North York, ON M2K 1E6, Canada' },
      { stationNumber: '132', name: 'Fire Station 132', address: '4155 Bathurst St, North York, ON M3H 3P1, Canada' },
      { stationNumber: '133', name: 'Fire Station 133', address: '1750 Avenue Rd, North York, ON M5M 3Y3, Canada' },
      { stationNumber: '134', name: 'Fire Station 134', address: '3415 Yonge St, North York, ON M4N 2M9, Canada' },
      { stationNumber: '135', name: 'Fire Station 135', address: '1291 Mount Pleasant Rd, Toronto, ON M4P 2L2, Canada' },
      // 14 District
      { stationNumber: '141', name: 'Fire Station 141', address: '1200 Jane St, North York, ON M3N 2H8, Canada' },
      { stationNumber: '142', name: 'Fire Station 142', address: '4330 Keele St, North York, ON M3J 1L8, Canada' },
      { stationNumber: '143', name: 'Fire Station 143', address: '1291 Weston Rd, York, ON M6M 4R2, Canada' },
      { stationNumber: '144', name: 'Fire Station 144', address: '5995 Islington Ave, Etobicoke, ON M9B 4Z4, Canada' },
      { stationNumber: '145', name: 'Fire Station 145', address: '1315 Royal York Rd, Etobicoke, ON M9A 4Y5, Canada' }
    ],
    East: [
      // 21 District
      { stationNumber: '211', name: 'Fire Station 211', address: '1750 Danforth Ave, Toronto, ON M4C 1J1, Canada' },
      { stationNumber: '212', name: 'Fire Station 212', address: '3415 Kingston Rd, Scarborough, ON M1M 1R1, Canada' },
      { stationNumber: '213', name: 'Fire Station 213', address: '1291 O\'Connor Dr, East York, ON M4B 2T8, Canada' },
      { stationNumber: '214', name: 'Fire Station 214', address: '5995 Lawrence Ave E, Scarborough, ON M1C 4G2, Canada' },
      { stationNumber: '215', name: 'Fire Station 215', address: '1315 Eglinton Ave E, Scarborough, ON M1L 2L1, Canada' },
      // 22 District
      { stationNumber: '221', name: 'Fire Station 221', address: '1200 Morningside Ave, Scarborough, ON M1B 0A7, Canada' },
      { stationNumber: '222', name: 'Fire Station 222', address: '4330 McCowan Rd, Scarborough, ON M1S 3Y6, Canada' },
      { stationNumber: '223', name: 'Fire Station 223', address: '1291 Markham Rd, Scarborough, ON M1H 2Y4, Canada' },
      { stationNumber: '224', name: 'Fire Station 224', address: '5995 Brimley Rd, Scarborough, ON M1V 1C2, Canada' },
      { stationNumber: '225', name: 'Fire Station 225', address: '1315 Kennedy Rd, Scarborough, ON M1P 2L6, Canada' },
      // 23 District
      { stationNumber: '231', name: 'Fire Station 231', address: '2895 Danforth Rd, Scarborough, ON M1L 1B2, Canada' },
      { stationNumber: '232', name: 'Fire Station 232', address: '4155 St. Clair Ave E, Scarborough, ON M1C 1T6, Canada' },
      { stationNumber: '233', name: 'Fire Station 233', address: '1750 Gerrard St E, Toronto, ON M4L 2B3, Canada' },
      { stationNumber: '234', name: 'Fire Station 234', address: '3415 Queen St E, Toronto, ON M1L 1A6, Canada' },
      { stationNumber: '235', name: 'Fire Station 235', address: '1291 Eastern Ave, Toronto, ON M4L 1A8, Canada' },
      // 24 District
      { stationNumber: '241', name: 'Fire Station 241', address: '1200 Sheppard Ave E, North York, ON M2K 1E2, Canada' },
      { stationNumber: '242', name: 'Fire Station 242', address: '4330 Finch Ave E, Scarborough, ON M1S 4T7, Canada' },
      { stationNumber: '243', name: 'Fire Station 243', address: '1291 Steeles Ave E, Markham, ON L3R 1G8, Canada' },
      { stationNumber: '244', name: 'Fire Station 244', address: '5995 Meadowvale Rd, Scarborough, ON M1V 4V1, Canada' },
      { stationNumber: '245', name: 'Fire Station 245', address: '1315 Ellesmere Rd, Scarborough, ON M1P 2X9, Canada' }
    ],
    South: [
      // 31 District
      { stationNumber: '311', name: 'Fire Station 311', address: '1750 Queen St E, Toronto, ON M4L 1G5, Canada' },
      { stationNumber: '312', name: 'Fire Station 312', address: '3415 King St E, Toronto, ON M1L 1A1, Canada' },
      { stationNumber: '313', name: 'Fire Station 313', address: '1291 Eastern Ave, Toronto, ON M4L 1A8, Canada' },
      { stationNumber: '314', name: 'Fire Station 314', address: '5995 Lake Shore Blvd E, Toronto, ON M1B 1A6, Canada' },
      { stationNumber: '315', name: 'Fire Station 315', address: '1315 Carlaw Ave, Toronto, ON M4K 3L1, Canada' },
      // 32 District
      { stationNumber: '321', name: 'Fire Station 321', address: '1200 Front St E, Toronto, ON M5A 1E2, Canada' },
      { stationNumber: '322', name: 'Fire Station 322', address: '4330 Cherry St, Toronto, ON M5A 3L2, Canada' },
      { stationNumber: '323', name: 'Fire Station 323', address: '1291 Commissioners St, Toronto, ON M4M 1A2, Canada' },
      { stationNumber: '324', name: 'Fire Station 324', address: '5995 Polson St, Toronto, ON M5A 1A3, Canada' },
      { stationNumber: '325', name: 'Fire Station 325', address: '1315 Unwin Ave, Toronto, ON M4E 3M7, Canada' },
      // 33 District
      { stationNumber: '331', name: 'Fire Station 331', address: '2895 Queen St E, Toronto, ON M4E 1G6, Canada' },
      { stationNumber: '332', name: 'Fire Station 332', address: '4155 King St E, Toronto, ON M1L 1A1, Canada' },
      { stationNumber: '333', name: 'Fire Station 333', address: '1750 Lake Shore Blvd W, Toronto, ON M6S 1A1, Canada' },
      { stationNumber: '334', name: 'Fire Station 334', address: '3415 Adelaide St E, Toronto, ON M5A 1S2, Canada' },
      { stationNumber: '335', name: 'Fire Station 335', address: '1291 Richmond St E, Toronto, ON M5A 1P4, Canada' },
      // 34 District
      { stationNumber: '341', name: 'Fire Station 341', address: '1200 Dundas St E, Toronto, ON M4M 1S2, Canada' },
      { stationNumber: '342', name: 'Fire Station 342', address: '4330 Gerrard St E, Toronto, ON M1L 1Y6, Canada' },
      { stationNumber: '343', name: 'Fire Station 343', address: '1291 Parliament St, Toronto, ON M4X 1P6, Canada' },
      { stationNumber: '344', name: 'Fire Station 344', address: '5995 Broadview Ave, Toronto, ON M4K 2N6, Canada' },
      { stationNumber: '345', name: 'Fire Station 345', address: '1315 Pape Ave, Toronto, ON M4K 3W4, Canada' }
    ],
    West: [
      // 41 District
      { stationNumber: '411', name: 'Fire Station 411', address: '1750 Queen St W, Toronto, ON M6R 1B2, Canada' },
      { stationNumber: '412', name: 'Fire Station 412', address: '3415 King St W, Toronto, ON M5V 1M1, Canada' },
      { stationNumber: '413', name: 'Fire Station 413', address: '1291 Dundas St W, Toronto, ON M6J 1X7, Canada' },
      { stationNumber: '415', name: 'Fire Station 415', address: '1315 College St, Toronto, ON M6H 1C3, Canada' },
      // 42 District
      { stationNumber: '421', name: 'Fire Station 421', address: '1200 Jane St, Toronto, ON M6M 4H4, Canada' },
      { stationNumber: '422', name: 'Fire Station 422', address: '4330 Keele St, Toronto, ON M3J 1L8, Canada' },
      { stationNumber: '423', name: 'Fire Station 423', address: '1291 Weston Rd, Toronto, ON M6M 4R2, Canada' },
      { stationNumber: '424', name: 'Fire Station 424', address: '5995 Islington Ave, Etobicoke, ON M9B 4Z4, Canada' },
      { stationNumber: '425', name: 'Fire Station 425', address: '1315 Royal York Rd, Etobicoke, ON M9A 4Y5, Canada' },
      { stationNumber: '426', name: 'Fire Station 426', address: '2895 The Queensway, Etobicoke, ON M9C 5J1, Canada' },
      // 43 District
      { stationNumber: '431', name: 'Fire Station 431', address: '2895 The Queensway, Etobicoke, ON M9C 5J1, Canada' },
      { stationNumber: '432', name: 'Fire Station 432', address: '4155 Lake Shore Blvd W, Etobicoke, ON M8W 1N6, Canada' },
      { stationNumber: '433', name: 'Fire Station 433', address: '1750 Brown\'s Line, Etobicoke, ON M8W 3T6, Canada' },
      { stationNumber: '434', name: 'Fire Station 434', address: '3415 Mimico Ave, Etobicoke, ON M8V 1R2, Canada' },
      { stationNumber: '435', name: 'Fire Station 435', address: '1291 Park Lawn Rd, Etobicoke, ON M8Y 1C5, Canada' },
      // 44 District
      { stationNumber: '441', name: 'Fire Station 441', address: '1200 Bloor St W, Toronto, ON M6H 1N2, Canada' },
      { stationNumber: '442', name: 'Fire Station 442', address: '4330 Dupont St, Toronto, ON M6H 1Z1, Canada' },
      { stationNumber: '443', name: 'Fire Station 443', address: '1291 Davenport Rd, Toronto, ON M6H 2G5, Canada' },
      { stationNumber: '444', name: 'Fire Station 444', address: '5995 St. Clair Ave W, Toronto, ON M6N 1A6, Canada' },
      { stationNumber: '445', name: 'Fire Station 445', address: '1315 Kipling Ave, Etobicoke, ON M9R 2Z6, Canada' }
    ]
  };

  // Fuel Yards data with enhanced information
  const fuelYards: FuelYard[] = [
    { name: 'Booth', address: '50 booth ave Toronto, ON' },
    { name: 'Pears', address: '1008 yonge st Toronto, ON' },
    { name: 'Manitoba', address: '2 Manitoba Dr, Toronto, ON' },
    { name: 'Disco', address: '150 Disco Rd, Etobicoke, ON' },
    { name: 'Bering', address: '320 Bering Ave, Etobicoke, ON' },
    { name: 'Castlefield', address: '1401 Castlefield Ave, Toronto ON' },
    { name: 'Alness', address: '1026 Finch ave W, Toronto, ON' },
    { name: 'Bermondsey', address: '25 Old Eglinton ave, Toronto, ON' },
    { name: 'Ellesmere', address: '1050 Ellesmere Rd, Toronto, ON' },
    { name: 'Morningside', address: '891 Morningside Ave, Toronto, ON' },
    { name: 'Nashdene', address: '70 Nashdene Rd, Scarborough, ON' },
    { name: 'Toryork', address: '61 Toryork Dr, North York, ON' }
  ];

  // Other locations data
  const otherLocations: OtherLocation[] = [
    {
      name: 'Mechanical',
      address: '40 Toryork Dr',
      searchQuery: '40 Toryork Dr'
    },
    {
      name: 'Stores',
      address: '15 Rotherham Ave',
      searchQuery: '15 Rotherham Ave'
    },
    {
      name: 'East Training',
      address: 'Toronto Fire Station 243',
      searchQuery: 'Toronto Fire station 243'
    },
    {
      name: 'West Training',
      address: 'Toronto Fire Station 411',
      searchQuery: 'Toronto Fire station 411'
    },
    {
      name: 'Academy',
      address: '895 Eastern Ave',
      searchQuery: '895 Eastern Ave'
    }
  ];

  const districts = [
    { name: 'North', color: '#FF6B6B', description: 'Districts 11, 12, 13, 14' },
    { name: 'East', color: '#4ECDC4', description: 'Districts 21, 22, 23, 24' },
    { name: 'South', color: '#45B7D1', description: 'Districts 31, 32, 33, 34' },
    { name: 'West', color: '#96CEB4', description: 'Districts 41, 42, 43, 44' },
    { name: 'Fuel Yards', color: '#FF9500', description: 'Fuel Supply Locations' },
    { name: 'Other', color: '#FFA726', description: 'Training & Support Facilities' }
  ];

  const selectedDistrictData = districts.find(d => d.name === selectedDistrict);
  const currentFireHalls = fireHalls[selectedDistrict as keyof typeof fireHalls] || [];

  const handleDirections = async (fireHall: FireHall) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Toronto+Fire+Station+${fireHall.stationNumber}`;
    
    try {
      const supported = await Linking.canOpenURL(googleMapsUrl);
      if (supported) {
        await Linking.openURL(googleMapsUrl);
      } else {
        Alert.alert(
          'Unable to Open Maps',
          'Google Maps is not available on this device.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      Alert.alert(
        'Error',
        'Unable to open directions. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleOtherLocationDirections = async (location: OtherLocation) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.searchQuery)}`;
    
    try {
      const supported = await Linking.canOpenURL(googleMapsUrl);
      if (supported) {
        await Linking.openURL(googleMapsUrl);
      } else {
        Alert.alert(
          'Unable to Open Maps',
          'Google Maps is not available on this device.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      Alert.alert(
        'Error',
        'Unable to open directions. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleFuelYardDirections = async (fuelYard: FuelYard) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fuelYard.address)}`;
    
    try {
      const supported = await Linking.canOpenURL(googleMapsUrl);
      if (supported) {
        await Linking.openURL(googleMapsUrl);
      } else {
        Alert.alert(
          'Unable to Open Maps',
          'Google Maps is not available on this device.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      Alert.alert(
        'Error',
        'Unable to open directions. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderFireHall = (fireHall: FireHall) => (
    <View key={fireHall.stationNumber} style={[styles.fireHallCard, { borderLeftColor: selectedDistrictData?.color }]}>
      <View style={styles.fireHallHeader}>
        <View style={[styles.stationBadge, { backgroundColor: selectedDistrictData?.color }]}>
          <Text style={styles.stationNumber}>{fireHall.stationNumber}</Text>
        </View>
        <Text style={styles.fireHallName}>{fireHall.name}</Text>
      </View>
      <TouchableOpacity 
        style={styles.directionsButton}
        onPress={() => handleDirections(fireHall)}
        activeOpacity={0.7}
      >
        <Icon name="navigate" size={20} style={{ color: 'white', marginRight: 8 }} />
        <Text style={styles.directionsButtonText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOtherLocation = (location: OtherLocation) => (
    <View key={location.name} style={[styles.fireHallCard, { borderLeftColor: selectedDistrictData?.color }]}>
      <View style={styles.fireHallHeader}>
        <View style={[styles.stationBadge, { backgroundColor: selectedDistrictData?.color }]}>
          <Icon name="business" size={16} style={{ color: 'white' }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.fireHallName}>{location.name}</Text>
          <Text style={styles.addressText}>{location.address}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.directionsButton}
        onPress={() => handleOtherLocationDirections(location)}
        activeOpacity={0.7}
      >
        <Icon name="navigate" size={20} style={{ color: 'white', marginRight: 8 }} />
        <Text style={styles.directionsButtonText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFuelYard = (fuelYard: FuelYard) => (
    <View key={fuelYard.name} style={[styles.fireHallCard, { borderLeftColor: selectedDistrictData?.color }]}>
      <View style={styles.fireHallHeader}>
        <View style={[styles.stationBadge, { backgroundColor: selectedDistrictData?.color }]}>
          <Icon name="hardware-chip" size={16} style={{ color: 'white' }} />
        </View>
        <Text style={styles.fireHallName}>{fuelYard.name}</Text>
      </View>
      <TouchableOpacity 
        style={styles.directionsButton}
        onPress={() => handleFuelYardDirections(fuelYard)}
        activeOpacity={0.7}
      >
        <Icon name="navigate" size={20} style={{ color: 'white', marginRight: 8 }} />
        <Text style={styles.directionsButtonText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  const getContentCount = () => {
    if (selectedDistrict === 'Other') return otherLocations.length;
    if (selectedDistrict === 'Fuel Yards') return fuelYards.length;
    return currentFireHalls.length;
  };

  const getContentType = () => {
    if (selectedDistrict === 'Other') return 'Locations';
    if (selectedDistrict === 'Fuel Yards') return 'Fuel Yards';
    return 'Fire Halls';
  };

  // Responsive calculations for fitting all tabs on screen
  const isSmallScreen = screenWidth < 375;
  const isMediumScreen = screenWidth >= 375 && screenWidth < 768;
  const isLargeScreen = screenWidth >= 768;

  const getTabWidth = () => {
    // Calculate available width for tabs (accounting for padding and margins)
    const availableWidth = screenWidth - 32; // 16px padding on each side
    const tabCount = districts.length; // 6 tabs total
    const tabSpacing = 8; // 4px margin on each side of tab
    const totalSpacing = tabSpacing * (tabCount - 1);
    
    return Math.floor((availableWidth - totalSpacing) / tabCount);
  };

  const getTabFontSize = () => {
    const tabWidth = getTabWidth();
    if (tabWidth < 50) return 10;
    if (tabWidth < 60) return 11;
    if (tabWidth < 70) return 12;
    return 13;
  };

  const getCardPadding = () => {
    if (isSmallScreen) return 12;
    if (isMediumScreen) return 16;
    return 20;
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.sectionHeader}>
        <Icon name="business" size={24} style={{ color: colors.accent, marginRight: 8 }} />
        <Text style={commonStyles.sectionTitle}>Toronto Fire Halls</Text>
      </View>

      {/* District Tabs - Fixed layout to fit all tabs on screen */}
      <View style={styles.tabContainer}>
        {districts.map(district => (
          <TouchableOpacity
            key={district.name}
            style={[
              styles.tab,
              {
                backgroundColor: selectedDistrict === district.name ? district.color : colors.card,
                elevation: selectedDistrict === district.name ? 4 : 2,
                width: getTabWidth(),
              }
            ]}
            onPress={() => setSelectedDistrict(district.name)}
          >
            <Text style={[
              styles.tabText,
              {
                color: selectedDistrict === district.name ? 'white' : colors.textSecondary,
                fontWeight: selectedDistrict === district.name ? 'bold' : '600',
                fontSize: getTabFontSize(),
              }
            ]}>
              {district.name === 'Fuel Yards' ? 'Fuel\nYards' : district.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Header - Responsive */}
      <View style={[styles.header, { 
        backgroundColor: selectedDistrictData?.color,
        marginHorizontal: screenWidth * 0.025,
        paddingHorizontal: getCardPadding(),
      }]}>
        <Icon 
          name={selectedDistrict === 'Fuel Yards' ? 'hardware-chip' : 'business'} 
          size={isSmallScreen ? 18 : 20} 
          style={{ color: 'white', marginRight: 8 }} 
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerText, { fontSize: isSmallScreen ? 16 : 18 }]}>
            {`${selectedDistrict} - ${getContentCount()} ${getContentType()}`}
          </Text>
          <Text style={[styles.headerSubtext, { fontSize: isSmallScreen ? 12 : 14 }]}>
            {selectedDistrictData?.description}
          </Text>
        </View>
      </View>

      {/* Content List - Responsive */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: screenWidth * 0.025,
          paddingBottom: screenHeight * 0.1 
        }}
      >
        {selectedDistrict === 'Other' && otherLocations.map(renderOtherLocation)}
        {selectedDistrict === 'Fuel Yards' && fuelYards.map(renderFuelYard)}
        {selectedDistrict !== 'Other' && selectedDistrict !== 'Fuel Yards' && currentFireHalls.map(renderFireHall)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 2,
    minHeight: 50,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabText: {
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtext: {
    color: 'white',
    opacity: 0.9,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  fireHallCard: {
    backgroundColor: colors.card,
    marginBottom: screenHeight * 0.015,
    borderRadius: 12,
    padding: screenWidth < 375 ? 12 : 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    width: '100%',
  },
  fireHallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  stationBadge: {
    paddingHorizontal: screenWidth < 375 ? 8 : 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
    minWidth: screenWidth < 375 ? 35 : 40,
    alignItems: 'center',
  },
  stationNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: screenWidth < 375 ? 12 : 14,
  },
  fireHallName: {
    fontSize: screenWidth < 375 ? 16 : 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    flexWrap: 'wrap',
  },
  addressText: {
    fontSize: screenWidth < 375 ? 12 : 14,
    color: colors.textSecondary,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: screenWidth < 375 ? 10 : 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    minHeight: 44,
  },
  directionsButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: screenWidth < 375 ? 14 : 16,
  },
});
