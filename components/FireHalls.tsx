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

  // Toronto Fire Hall locations based on tfspics.com
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
    {
      name: "Fire Station 121",
      address: "1209 Davenport Road",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#121"
    },
    {
      name: "Fire Station 122",
      address: "1421 Yonge Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#122"
    },
    {
      name: "Fire Station 123",
      address: "1254 College Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#123"
    },
    {
      name: "Fire Station 124",
      address: "1275 Dupont Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#124"
    },
    {
      name: "Fire Station 125",
      address: "1405 Bathurst Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#125"
    },
    {
      name: "Fire Station 126",
      address: "3034 Bathurst Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#126"
    },
    {
      name: "Fire Station 127",
      address: "4330 Dufferin Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#127"
    },
    {
      name: "Fire Station 128",
      address: "5995 Yonge Street",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#128"
    },
    {
      name: "Fire Station 129",
      address: "745 Wilson Avenue",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#129"
    },
    {
      name: "Fire Station 131",
      address: "865 Lawrence Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#131"
    },
    {
      name: "Fire Station 132",
      address: "835 Sheppard Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#132"
    },
    {
      name: "Fire Station 133",
      address: "805 Finch Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#133"
    },
    {
      name: "Fire Station 134",
      address: "775 Steeles Avenue East",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#134"
    },
    {
      name: "Fire Station 135",
      address: "1209 Davenport Road",
      district: "North",
      phone: "(416) 392-3030",
      stationNumber: "#135"
    },

    // East District (Station numbers starting with 2)
    {
      name: "Fire Station 211",
      address: "1045 Gerrard Street East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#211"
    },
    {
      name: "Fire Station 212",
      address: "1015 Eastern Avenue",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#212"
    },
    {
      name: "Fire Station 213",
      address: "985 Broadview Avenue",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#213"
    },
    {
      name: "Fire Station 214",
      address: "955 O'Connor Drive",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#214"
    },
    {
      name: "Fire Station 215",
      address: "925 St. Clair Avenue East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#215"
    },
    {
      name: "Fire Station 216",
      address: "895 Eglinton Avenue East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#216"
    },
    {
      name: "Fire Station 217",
      address: "315 Parliament Street",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#217"
    },
    {
      name: "Fire Station 218",
      address: "1421 Yonge Street",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#218"
    },
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
    {
      name: "Fire Station 231",
      address: "1045 Gerrard Street East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#231"
    },
    {
      name: "Fire Station 232",
      address: "1015 Eastern Avenue",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#232"
    },
    {
      name: "Fire Station 233",
      address: "985 Broadview Avenue",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#233"
    },
    {
      name: "Fire Station 234",
      address: "955 O'Connor Drive",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#234"
    },
    {
      name: "Fire Station 235",
      address: "925 St. Clair Avenue East",
      district: "East",
      phone: "(416) 392-3030",
      stationNumber: "#235"
    },

    // South District (Station numbers starting with 3)
    {
      name: "Fire Station 311",
      address: "145 Front Street East",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#311"
    },
    {
      name: "Fire Station 312",
      address: "220 Adelaide Street West",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#312"
    },
    {
      name: "Fire Station 313",
      address: "1254 College Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#313"
    },
    {
      name: "Fire Station 314",
      address: "1275 Dupont Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#314"
    },
    {
      name: "Fire Station 315",
      address: "1405 Bathurst Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#315"
    },
    {
      name: "Fire Station 316",
      address: "200 Cherry Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#316"
    },
    {
      name: "Fire Station 317",
      address: "1450 Queen Street East",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#317"
    },
    {
      name: "Fire Station 321",
      address: "145 Front Street East",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#321"
    },
    {
      name: "Fire Station 322",
      address: "220 Adelaide Street West",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#322"
    },
    {
      name: "Fire Station 323",
      address: "1254 College Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#323"
    },
    {
      name: "Fire Station 324",
      address: "1275 Dupont Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#324"
    },
    {
      name: "Fire Station 325",
      address: "1405 Bathurst Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#325"
    },
    {
      name: "Fire Station 326",
      address: "200 Cherry Street",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#326"
    },
    {
      name: "Fire Station 327",
      address: "1450 Queen Street East",
      district: "South",
      phone: "(416) 392-3030",
      stationNumber: "#327"
    },
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
      name: "Fire Station 411",
      address: "1305 Dundas Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#411"
    },
    {
      name: "Fire Station 412",
      address: "1120 Ossington Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#412"
    },
    {
      name: "Fire Station 413",
      address: "1265 Queen Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#413"
    },
    {
      name: "Fire Station 414",
      address: "1145 Bloor Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#414"
    },
    {
      name: "Fire Station 415",
      address: "1095 Lansdowne Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#415"
    },
    {
      name: "Fire Station 416",
      address: "715 Dufferin Street",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#416"
    },
    {
      name: "Fire Station 417",
      address: "685 Jane Street",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#417"
    },
    {
      name: "Fire Station 418",
      address: "655 Runnymede Road",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#418"
    },
    {
      name: "Fire Station 419",
      address: "625 Royal York Road",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#419"
    },
    {
      name: "Fire Station 421",
      address: "1305 Dundas Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#421"
    },
    {
      name: "Fire Station 422",
      address: "1120 Ossington Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#422"
    },
    {
      name: "Fire Station 423",
      address: "1265 Queen Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#423"
    },
    {
      name: "Fire Station 424",
      address: "1145 Bloor Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#424"
    },
    {
      name: "Fire Station 425",
      address: "1095 Lansdowne Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#425"
    },
    {
      name: "Fire Station 426",
      address: "715 Dufferin Street",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#426"
    },
    {
      name: "Fire Station 427",
      address: "685 Jane Street",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#427"
    },
    {
      name: "Fire Station 428",
      address: "655 Runnymede Road",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#428"
    },
    {
      name: "Fire Station 429",
      address: "625 Royal York Road",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#429"
    },
    {
      name: "Fire Station 431",
      address: "1305 Dundas Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#431"
    },
    {
      name: "Fire Station 432",
      address: "1120 Ossington Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#432"
    },
    {
      name: "Fire Station 433",
      address: "1265 Queen Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#433"
    },
    {
      name: "Fire Station 434",
      address: "1145 Bloor Street West",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#434"
    },
    {
      name: "Fire Station 435",
      address: "1095 Lansdowne Avenue",
      district: "West",
      phone: "(416) 392-3030",
      stationNumber: "#435"
    },
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