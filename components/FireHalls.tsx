import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

export default function FireHalls() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('North');

  const districts = [
    {
      name: 'North',
      url: 'https://www.tfspics.com/Toronto-Fire-Stations/North-Command/i-tZ48BxH',
      color: '#FF6B6B'
    },
    {
      name: 'East', 
      url: 'https://www.tfspics.com/Toronto-Fire-Stations/East-Command',
      color: '#4ECDC4'
    },
    {
      name: 'South',
      url: 'https://www.tfspics.com/Toronto-Fire-Stations/South-Command', 
      color: '#45B7D1'
    },
    {
      name: 'West',
      url: 'https://www.tfspics.com/Toronto-Fire-Stations/West-Command',
      color: '#96CEB4'
    }
  ];

  const selectedDistrictData = districts.find(d => d.name === selectedDistrict);

  const handleOpenInBrowser = () => {
    if (selectedDistrictData) {
      Linking.openURL(selectedDistrictData.url).catch(err => {
        console.error('Error opening URL:', err);
        Alert.alert('Error', 'Unable to open link');
      });
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.sectionHeader}>
        <Icon name="business" size={24} style={{ color: colors.accent, marginRight: 8 }} />
        <Text style={commonStyles.sectionTitle}>Toronto Fire Halls</Text>
      </View>

      {/* District Tabs */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        padding: 15, 
        backgroundColor: colors.background,
        marginBottom: 10
      }}>
        {districts.map(district => (
          <TouchableOpacity
            key={district.name}
            style={{
              padding: 15,
              backgroundColor: selectedDistrict === district.name ? district.color : colors.lightGray,
              borderRadius: 10,
              minWidth: 80,
              alignItems: 'center',
              elevation: selectedDistrict === district.name ? 4 : 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}
            onPress={() => setSelectedDistrict(district.name)}
          >
            <Text style={{ 
              color: selectedDistrict === district.name ? 'white' : colors.textSecondary,
              fontWeight: selectedDistrict === district.name ? 'bold' : 'normal',
              fontSize: 16
            }}>
              {district.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Header with Open in Browser button */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginBottom: 10
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: selectedDistrictData?.color || colors.primary,
          flex: 1
        }}>
          {selectedDistrict} Command Fire Stations
        </Text>
        
        <TouchableOpacity
          style={{
            backgroundColor: selectedDistrictData?.color || colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={handleOpenInBrowser}
        >
          <Icon name="open" size={16} style={{ color: 'white', marginRight: 4 }} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
            Open in Browser
          </Text>
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <View style={{ 
        flex: 1, 
        margin: 10, 
        borderRadius: 10, 
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      }}>
        {selectedDistrictData && (
          <WebView
            source={{ uri: selectedDistrictData.url }}
            style={{ flex: 1 }}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background
              }}>
                <Icon name="refresh" size={32} style={{ color: selectedDistrictData.color, marginBottom: 10 }} />
                <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
                  Loading {selectedDistrict} Command Fire Stations...
                </Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error('WebView error: ', nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error('WebView HTTP error: ', nativeEvent);
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            scalesPageToFit={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Info Footer */}
      <View style={{
        backgroundColor: 'white',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Icon name="information-circle" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={{ fontWeight: 'bold', color: colors.text, fontSize: 16 }}>
            Fire Station Information
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary, lineHeight: 20 }}>
          Browse photos and information about Toronto Fire Services stations in the {selectedDistrict} Command. 
          Tap "Open in Browser" for the full experience with larger images and detailed information.
        </Text>
      </View>
    </View>
  );
}