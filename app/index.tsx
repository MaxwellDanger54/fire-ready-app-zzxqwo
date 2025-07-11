import { Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import ImportantNumbers from '../components/ImportantNumbers';
import ResourceLinks from '../components/ResourceLinks';
import HomeInfo from '../components/HomeInfo';
import ShiftCalendar from '../components/ShiftCalendar';
import FireHalls from '../components/FireHalls';
import ActiveIncidents from '../components/ActiveIncidents';

type TabType = 'home' | 'numbers' | 'resources' | 'calendar' | 'firehalls' | 'incidents';

export default function FirefighterApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate responsive font size for title based on screen width
  const getTitleFontSize = () => {
    if (screenWidth < 350) {
      return 22; // Very small screens
    } else if (screenWidth < 400) {
      return 26; // Small screens
    } else if (screenWidth < 450) {
      return 30; // Medium screens
    } else {
      return 34; // Normal screens and larger
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeInfo />;
      case 'numbers':
        return <ImportantNumbers />;
      case 'resources':
        return <ResourceLinks />;
      case 'calendar':
        return <ShiftCalendar />;
      case 'firehalls':
        return <FireHalls />;
      case 'incidents':
        return <ActiveIncidents />;
      default:
        return <HomeInfo />;
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* Header with integrated logo and text */}
      <View style={commonStyles.header}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginBottom: 8
        }}>
          {/* New larger logo */}
          <Image 
            source={require('../assets/images/ef1b634c-92d0-4664-ab3a-0c43e8987c0d.png')}
            style={{
              width: 120,
              height: 120,
              resizeMode: 'contain',
              marginBottom: -10
            }}
          />
          
          {/* Title centered over the logo - Operations on top, Dashboard below */}
          <View style={{
            position: 'absolute',
            top: '35%',
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateY: -15 }],
            paddingHorizontal: 10
          }}>
            <Text style={{
              fontSize: getTitleFontSize(),
              fontWeight: '800',
              color: colors.text,
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
              letterSpacing: 0.5,
              lineHeight: getTitleFontSize() * 1.1,
              marginBottom: -2
            }}>
              Operations
            </Text>
            <Text style={{
              fontSize: getTitleFontSize(),
              fontWeight: '800',
              color: colors.text,
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
              letterSpacing: 0.5,
              lineHeight: getTitleFontSize() * 1.1
            }}>
              Dashboard
            </Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation - Fixed layout without scrolling */}
      <View style={[commonStyles.tabContainer, { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        paddingVertical: 8,
        marginHorizontal: 4,
        marginBottom: 8,
        marginTop: 16
      }]}>
        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'home' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 10, 
              paddingHorizontal: 2,
              marginHorizontal: 1,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('home')}
        >
          <Icon 
            name="home" 
            size={18} 
            style={{ 
              color: activeTab === 'home' ? colors.text : colors.textSecondary,
              marginBottom: 2 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'home' && commonStyles.activeTabText,
            { fontSize: 9, textAlign: 'center' }
          ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'numbers' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 10, 
              paddingHorizontal: 2,
              marginHorizontal: 1,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('numbers')}
        >
          <Icon 
            name="call" 
            size={18} 
            style={{ 
              color: activeTab === 'numbers' ? colors.text : colors.textSecondary,
              marginBottom: 2 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'numbers' && commonStyles.activeTabText,
            { fontSize: 9, textAlign: 'center' }
          ]}>
            Numbers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'calendar' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 10, 
              paddingHorizontal: 2,
              marginHorizontal: 1,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('calendar')}
        >
          <Icon 
            name="calendar" 
            size={18} 
            style={{ 
              color: activeTab === 'calendar' ? colors.text : colors.textSecondary,
              marginBottom: 2 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'calendar' && commonStyles.activeTabText,
            { fontSize: 9, textAlign: 'center' }
          ]}>
            Calendar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'firehalls' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 10, 
              paddingHorizontal: 2,
              marginHorizontal: 1,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('firehalls')}
        >
          <Icon 
            name="business" 
            size={18} 
            style={{ 
              color: activeTab === 'firehalls' ? colors.text : colors.textSecondary,
              marginBottom: 2 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'firehalls' && commonStyles.activeTabText,
            { fontSize: 9, textAlign: 'center' }
          ]}>
            Fire Halls
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'incidents' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 10, 
              paddingHorizontal: 2,
              marginHorizontal: 1,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('incidents')}
        >
          <Icon 
            name="flame" 
            size={18} 
            style={{ 
              color: activeTab === 'incidents' ? colors.text : colors.textSecondary,
              marginBottom: 2 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'incidents' && commonStyles.activeTabText,
            { fontSize: 9, textAlign: 'center' }
          ]}>
            Incidents
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'resources' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 10, 
              paddingHorizontal: 2,
              marginHorizontal: 1,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('resources')}
        >
          <Icon 
            name="library" 
            size={18} 
            style={{ 
              color: activeTab === 'resources' ? colors.text : colors.textSecondary,
              marginBottom: 2 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'resources' && commonStyles.activeTabText,
            { fontSize: 9, textAlign: 'center' }
          ]}>
            Resources
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}