import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import ImportantNumbers from '../components/ImportantNumbers';
import ResourceLinks from '../components/ResourceLinks';
import EmergencyInfo from '../components/EmergencyInfo';
import ShiftCalendar from '../components/ShiftCalendar';

type TabType = 'emergency' | 'numbers' | 'resources' | 'calendar';

export default function FirefighterApp() {
  const [activeTab, setActiveTab] = useState<TabType>('emergency');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'emergency':
        return <EmergencyInfo />;
      case 'numbers':
        return <ImportantNumbers />;
      case 'resources':
        return <ResourceLinks />;
      case 'calendar':
        return <ShiftCalendar />;
      default:
        return <EmergencyInfo />;
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
      <View style={commonStyles.tabContainer}>
        <TouchableOpacity
          style={[commonStyles.tab, activeTab === 'emergency' && commonStyles.activeTab]}
          onPress={() => setActiveTab('emergency')}
        >
          <Icon 
            name="warning" 
            size={20} 
            style={{ 
              color: activeTab === 'emergency' ? colors.text : colors.textSecondary,
              marginBottom: 4 
            }} 
          />
          <Text style={[
            commonStyles.tabText,
            activeTab === 'emergency' && commonStyles.activeTabText
          ]}>
            Emergency
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.tab, activeTab === 'numbers' && commonStyles.activeTab]}
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
          style={[commonStyles.tab, activeTab === 'calendar' && commonStyles.activeTab]}
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
          style={[commonStyles.tab, activeTab === 'resources' && commonStyles.activeTab]}
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

      {/* Content */}
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}