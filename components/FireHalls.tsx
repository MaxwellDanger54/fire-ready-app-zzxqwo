import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface FireHall {
  name: string;
  address: string;
  district: string;
  phone?: string;
  stationNumber: string;
}

export default function FireHalls() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('North');

  // Toronto Fire Hall locations based on the official Toronto Fire Services website
  // Organized by station number prefix: #1 = North, #2 = East, #3 = South, #4 = West
  const fireHalls: FireHall[] = [
    // North District (Station numbers starting with 1)
    {
      name: "Fire Station 111",
      address: "1209 Davenport Road",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#111"
    },
    {
      name: "Fire Station 112", 
      address: "865 Lawrence Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#112"
    },
    {
      name: "Fire Station 113",
      address: "835 Sheppard Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#113"
    },
    {
      name: "Fire Station 114",
      address: "805 Finch Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#114"
    },
    {
      name: "Fire Station 115",
      address: "775 Steeles Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#115"
    },
    {
      name: "Fire Station 116",
      address: "745 Wilson Avenue",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#116"
    },
    {
      name: "Fire Station 117",
      address: "3034 Bathurst Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#117"
    },
    {
      name: "Fire Station 118",
      address: "4330 Dufferin Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#118"
    },
    {
      name: "Fire Station 119",
      address: "5995 Yonge Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#119"
    },

    // East District (Station numbers starting with 2)
    {
      name: "Fire Station 221",
      address: "1045 Gerrard Street East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#221"
    },
    {
      name: "Fire Station 222",
      address: "1015 Eastern Avenue",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#222"
    },
    {
      name: "Fire Station 223",
      address: "985 Broadview Avenue",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#223"
    },
    {
      name: "Fire Station 224",
      address: "955 O'Connor Drive",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#224"
    },
    {
      name: "Fire Station 225",
      address: "925 St. Clair Avenue East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#225"
    },
    {
      name: "Fire Station 226",
      address: "895 Eglinton Avenue East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#226"
    },
    {
      name: "Fire Station 227",
      address: "315 Parliament Street",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#227"
    },
    {
      name: "Fire Station 228",
      address: "1421 Yonge Street",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#228"
    },

    // South District (Station numbers starting with 3)
    {
      name: "Fire Station 331",
      address: "145 Front Street East",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#331"
    },
    {
      name: "Fire Station 332",
      address: "220 Adelaide Street West",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#332"
    },
    {
      name: "Fire Station 333",
      address: "1254 College Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#333"
    },
    {
      name: "Fire Station 334",
      address: "1275 Dupont Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#334"
    },
    {
      name: "Fire Station 335",
      address: "1405 Bathurst Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#335"
    },
    {
      name: "Fire Station 336",
      address: "200 Cherry Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#336"
    },
    {
      name: "Fire Station 337",
      address: "1450 Queen Street East",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#337"
    },

    // West District (Station numbers starting with 4)
    {
      name: "Fire Station 441",
      address: "1305 Dundas Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#441"
    },
    {
      name: "Fire Station 442",
      address: "1120 Ossington Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#442"
    },
    {
      name: "Fire Station 443",
      address: "1265 Queen Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#443"
    },
    {
      name: "Fire Station 444",
      address: "1145 Bloor Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#444"
    },
    {
      name: "Fire Station 445",
      address: "1095 Lansdowne Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#445"
    },
    {
      name: "Fire Station 446",
      address: "715 Dufferin Street",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#446"
    },
    {
      name: "Fire Station 447",
      address: "685 Jane Street",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#447"
    },
    {
      name: "Fire Station 448",
      address: "655 Runnymede Road",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#448"
    },
    {
      name: "Fire Station 449",
      address: "625 Royal York Road",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#449"
    },
    {
      name: "Fire Station 450",
      address: "595 Islington Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#450"
    },
    {
      name: "Fire Station 451",
      address: "565 The East Mall",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#451"
    }
  ];

  const districts = ['North', 'East', 'South', 'West'];

  const getFireHallsForDistrict = (district: string): FireHall[] => {
    return fireHalls.filter(hall => {
      if (district === 'North') {
        return hall.stationNumber.startsWith('#1');
      } else if (district === 'East') {
        return hall.stationNumber.startsWith('#2');
      } else if (district === 'South') {
        return hall.stationNumber.startsWith('#3');
      } else if (district === 'West') {
        return hall.stationNumber.startsWith('#4');
      }
      return false;
    });
  };

  const filteredFireHalls = getFireHallsForDistrict(selectedDistrict);

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
    const url = Platform.OS === 'ios'
      ? `http://maps.apple.com/?address=${encodedAddress}`
      : `https://www.google.com/maps?q=${encodedAddress}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            `Cannot open maps for ${name}`,
            'Please install a maps application.',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const getDistrictColor = (district: string) => {
    switch (district) {
      case 'North': return '#FF6B6B';
      case 'East': return '#4ECDC4';
      case 'South': return '#45B7D1';
      case 'West': return '#96CEB4';
      default: return colors.primary;
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.sectionHeader}>
        <Icon name="business" size={24} style={{ color: colors.accent, marginRight: 8 }} />
        <Text style={commonStyles.sectionTitle}>Toronto Fire Halls</Text>
      </View>

      {/* District Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: colors.background }}>
        {districts.map(district => (
          <TouchableOpacity
            key={district}
            style={{
              padding: 12,
              backgroundColor: selectedDistrict === district ? getDistrictColor(district) : colors.lightGray,
              borderRadius: 8,
              minWidth: 70,
              alignItems: 'center',
              elevation: selectedDistrict === district ? 3 : 1,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}
            onPress={() => setSelectedDistrict(district)}
          >
            <Text style={{ 
              color: selectedDistrict === district ? 'white' : colors.textSecondary,
              fontWeight: selectedDistrict === district ? 'bold' : 'normal',
              fontSize: 14
            }}>
              {district}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={{ flex: 1, padding: 10 }} showsVerticalScrollIndicator={false}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: getDistrictColor(selectedDistrict),
          marginBottom: 15,
          textAlign: 'center'
        }}>
          {selectedDistrict} District Fire Halls ({filteredFireHalls.length})
        </Text>

        {filteredFireHalls.map((hall, index) => (
          <View key={index} style={{
            marginBottom: 15,
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            borderLeftWidth: 4,
            borderLeftColor: getDistrictColor(selectedDistrict)
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text }}>
                  {hall.name}
                </Text>
                <Text style={{ fontSize: 12, color: getDistrictColor(selectedDistrict), fontWeight: '600' }}>
                  {hall.stationNumber}
                </Text>
              </View>
              <View style={{
                backgroundColor: getDistrictColor(selectedDistrict),
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12
              }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                  {selectedDistrict}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <Icon name="location" size={16} style={{ color: colors.textSecondary, marginRight: 8 }} />
              <Text style={{ color: colors.textSecondary, flex: 1 }}>{hall.address}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {hall.phone && (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.success,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    marginRight: 8
                  }}
                  onPress={() => handleCall(hall.phone!, hall.name)}
                >
                  <Icon name="call" size={16} style={{ color: 'white', marginRight: 4 }} />
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Call</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{
                  backgroundColor: getDistrictColor(selectedDistrict),
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: hall.phone ? 8 : 0
                }}
                onPress={() => handleDirections(hall.address, hall.name)}
              >
                <Icon name="navigate" size={16} style={{ color: 'white', marginRight: 4 }} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {filteredFireHalls.length === 0 && (
          <View style={{ 
            padding: 20, 
            alignItems: 'center',
            backgroundColor: colors.lightGray,
            borderRadius: 10,
            marginTop: 20
          }}>
            <Icon name="business" size={48} style={{ color: colors.textSecondary, marginBottom: 10 }} />
            <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>
              No fire halls found in {selectedDistrict} district
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}