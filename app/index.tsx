import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
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
      {/* Header */}
      <View style={commonStyles.header}>
        <Icon name="flame" size={32} style={{ color: colors.accent, marginBottom: 8 }} />
        <Text style={commonStyles.headerTitle}>Firefighter Command</Text>
      </View>

      {/* Tab Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 80 }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <View style={[commonStyles.tabContainer, { flexDirection: 'row', width: 'auto', minWidth: '100%' }]}>
          <TouchableOpacity
            style={[commonStyles.tab, activeTab === 'home' && commonStyles.activeTab, { minWidth: 80 }]}
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
              activeTab === 'home' && commonStyles.activeTabText
            ]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.tab, activeTab === 'numbers' && commonStyles.activeTab, { minWidth: 80 }]}
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
              activeTab === 'numbers' && commonStyles.activeTabText
            ]}>
              Numbers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.tab, activeTab === 'calendar' && commonStyles.activeTab, { minWidth: 80 }]}
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
              activeTab === 'calendar' && commonStyles.activeTabText
            ]}>
              Calendar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.tab, activeTab === 'firehalls' && commonStyles.activeTab, { minWidth: 80 }]}
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
              activeTab === 'firehalls' && commonStyles.activeTabText
            ]}>
              Fire Halls
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.tab, activeTab === 'resources' && commonStyles.activeTab, { minWidth: 80 }]}
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
              activeTab === 'resources' && commonStyles.activeTabText
            ]}>
              Resources
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Content */}
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}