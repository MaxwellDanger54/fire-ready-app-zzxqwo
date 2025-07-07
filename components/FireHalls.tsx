import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface FireHall {
  name: string;
  address: string;
  district: string;
  phone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function FireHalls() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Toronto Fire Hall locations based on the LocalWiki data
  const fireHalls: FireHall[] = [
    {
      name: "Fire Station 1",
      address: "145 Front Street East",
      district: "Downtown",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 2", 
      address: "1405 Bathurst Street",
      district: "Central",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 3",
      address: "220 Adelaide Street West", 
      district: "Downtown",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 4",
      address: "315 Parliament Street",
      district: "Downtown",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 5",
      address: "1305 Dundas Street West",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 6",
      address: "1421 Yonge Street",
      district: "Central",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 7",
      address: "1254 College Street",
      district: "Central",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 8",
      address: "1275 Dupont Street",
      district: "Central",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 9",
      address: "1120 Ossington Avenue",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 10",
      address: "1265 Queen Street West",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 11",
      address: "1209 Davenport Road",
      district: "Central",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 12",
      address: "1145 Bloor Street West",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 13",
      address: "1095 Lansdowne Avenue",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 14",
      address: "1045 Gerrard Street East",
      district: "East",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 15",
      address: "1015 Eastern Avenue",
      district: "East",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 16",
      address: "985 Broadview Avenue",
      district: "East",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 17",
      address: "955 O'Connor Drive",
      district: "East",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 18",
      address: "925 St. Clair Avenue East",
      district: "East",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 19",
      address: "895 Eglinton Avenue East",
      district: "East",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 20",
      address: "865 Lawrence Avenue East",
      district: "North",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 21",
      address: "835 Sheppard Avenue East",
      district: "North",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 22",
      address: "805 Finch Avenue East",
      district: "North",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 23",
      address: "775 Steeles Avenue East",
      district: "North",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 24",
      address: "745 Wilson Avenue",
      district: "North",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 25",
      address: "715 Dufferin Street",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 26",
      address: "685 Jane Street",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 27",
      address: "655 Runnymede Road",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 28",
      address: "625 Royal York Road",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 29",
      address: "595 Islington Avenue",
      district: "West",
      phone: "(416) 392-3030"
    },
    {
      name: "Fire Station 30",
      address: "565 The East Mall",
      district: "West",
      phone: "(416) 392-3030"
    }
  ];

  const districts = ['all', 'Downtown', 'Central', 'East', 'West', 'North'];

  const filteredFireHalls = selectedDistrict === 'all' 
    ? fireHalls 
    : fireHalls.filter(hall => hall.district === selectedDistrict);

  const handleCall = (phone: string, name: string) => {
    Alert.alert(
      'Call Fire Station',
      `Call ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => {
            const phoneUrl = `tel:${phone}`;
            Linking.openURL(phoneUrl).catch(err => {
              console.error('Error making call:', err);
              Alert.alert('Error', 'Unable to make phone call');
            });
          }
        }
      ]
    );
  };

  const handleDirections = (address: string, name: string) => {
    const encodedAddress = encodeURIComponent(`${address}, Toronto, ON`);
    const mapsUrl = `https://maps.google.com/maps?q=${encodedAddress}`;
    
    Linking.openURL(mapsUrl).catch(err => {
      console.error('Error opening maps:', err);
      Alert.alert('Error', 'Unable to open maps');
    });
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.sectionHeader}>
        <Icon name="business" size={24} style={{ color: colors.accent, marginRight: 8 }} />
        <Text style={commonStyles.sectionTitle}>Toronto Fire Halls</Text>
      </View>

      {/* District Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16, maxHeight: 50 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {districts.map((district) => (
          <TouchableOpacity
            key={district}
            style={[
              commonStyles.filterButton,
              selectedDistrict === district && commonStyles.activeFilterButton
            ]}
            onPress={() => setSelectedDistrict(district)}
          >
            <Text style={[
              commonStyles.filterButtonText,
              selectedDistrict === district && commonStyles.activeFilterButtonText
            ]}>
              {district === 'all' ? 'All Districts' : district}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {filteredFireHalls.map((hall, index) => (
          <View key={index} style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.cardTitle}>{hall.name}</Text>
                <Text style={commonStyles.cardSubtitle}>{hall.district} District</Text>
              </View>
              <View style={commonStyles.districtBadge}>
                <Text style={commonStyles.districtBadgeText}>{hall.district}</Text>
              </View>
            </View>

            <View style={commonStyles.cardContent}>
              <View style={commonStyles.infoRow}>
                <Icon name="location" size={16} style={{ color: colors.textSecondary, marginRight: 8 }} />
                <Text style={commonStyles.infoText}>{hall.address}</Text>
              </View>

              {hall.phone && (
                <View style={commonStyles.infoRow}>
                  <Icon name="call" size={16} style={{ color: colors.textSecondary, marginRight: 8 }} />
                  <Text style={commonStyles.infoText}>{hall.phone}</Text>
                </View>
              )}
            </View>

            <View style={commonStyles.cardActions}>
              {hall.phone && (
                <TouchableOpacity
                  style={[commonStyles.actionButton, { backgroundColor: colors.success }]}
                  onPress={() => handleCall(hall.phone!, hall.name)}
                >
                  <Icon name="call" size={16} style={{ color: 'white', marginRight: 4 }} />
                  <Text style={commonStyles.actionButtonText}>Call</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[commonStyles.actionButton, { backgroundColor: colors.primary }]}
                onPress={() => handleDirections(hall.address, hall.name)}
              >
                <Icon name="navigate" size={16} style={{ color: 'white', marginRight: 4 }} />
                <Text style={commonStyles.actionButtonText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}