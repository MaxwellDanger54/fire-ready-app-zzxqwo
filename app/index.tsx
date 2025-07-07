import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import ImportantNumbers from '../components/ImportantNumbers';
import ResourceLinks from '../components/ResourceLinks';
import HomeInfo from '../components/HomeInfo';
import ShiftCalendar from '../components/ShiftCalendar';
import FireHalls from '../components/FireHalls';

type TabType = 'home' | 'numbers' | 'resources' | 'calendar' | 'firehalls';

export default function FirefighterApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

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
          
          {/* Text integrated with logo */}
          <View style={{
            position: 'absolute',
            bottom: -35,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={[commonStyles.headerTitle, {
              fontSize: 22,
              fontWeight: '800',
              color: colors.text,
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
              letterSpacing: 0.5
            }]}>
              TFS Operations Dashboard
            </Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation - Fixed layout without scrolling */}
      <View style={[commonStyles.tabContainer, { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginHorizontal: 8,
        marginBottom: 8,
        marginTop: 16
      }]}>
        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'home' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 12, 
              paddingHorizontal: 4,
              marginHorizontal: 2,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('home')}
        >
          <Icon 
            name="home" 
            size={20} 
            style={{ 
              color: activeTab === 'home' ? colors.text : colors.textSecondary,
              marginBottom: 4 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'home' && commonStyles.activeTabText,
            { fontSize: 12, textAlign: 'center' }
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
              paddingVertical: 12, 
              paddingHorizontal: 4,
              marginHorizontal: 2,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('numbers')}
        >
          <Icon 
            name="call" 
            size={20} 
            style={{ 
              color: activeTab === 'numbers' ? colors.text : colors.textSecondary,
              marginBottom: 4 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'numbers' && commonStyles.activeTabText,
            { fontSize: 12, textAlign: 'center' }
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
              paddingVertical: 12, 
              paddingHorizontal: 4,
              marginHorizontal: 2,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('calendar')}
        >
          <Icon 
            name="calendar" 
            size={20} 
            style={{ 
              color: activeTab === 'calendar' ? colors.text : colors.textSecondary,
              marginBottom: 4 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'calendar' && commonStyles.activeTabText,
            { fontSize: 12, textAlign: 'center' }
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
              paddingVertical: 12, 
              paddingHorizontal: 4,
              marginHorizontal: 2,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('firehalls')}
        >
          <Icon 
            name="business" 
            size={20} 
            style={{ 
              color: activeTab === 'firehalls' ? colors.text : colors.textSecondary,
              marginBottom: 4 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'firehalls' && commonStyles.activeTabText,
            { fontSize: 12, textAlign: 'center' }
          ]}>
            Fire Halls
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            commonStyles.tab, 
            activeTab === 'resources' && commonStyles.activeTab, 
            { 
              flex: 1,
              paddingVertical: 12, 
              paddingHorizontal: 4,
              marginHorizontal: 2,
              alignItems: 'center'
            }
          ]}
          onPress={() => setActiveTab('resources')}
        >
          <Icon 
            name="library" 
            size={20} 
            style={{ 
              color: activeTab === 'resources' ? colors.text : colors.textSecondary,
              marginBottom: 4 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'resources' && commonStyles.activeTabText,
            { fontSize: 12, textAlign: 'center' }
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