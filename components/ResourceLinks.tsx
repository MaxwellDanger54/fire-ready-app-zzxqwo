import { Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface ResourceLink {
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

export default function ResourceLinks() {
  const handleLinkPress = (url: string, title: string) => {
    Alert.alert(
      'Open Link',
      `Open ${title} in browser?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open', 
          onPress: () => Linking.openURL(url)
        }
      ]
    );
  };

  const resources: ResourceLink[] = [
    {
      title: 'Toronto Firefighters Association',
      description: 'Official website with news, updates, and member information',
      url: 'https://www.torontofirefighters.org/',
      icon: 'home',
      category: 'Official'
    },
    {
      title: 'Fire Chief Communications (FCCs)',
      description: 'Access fire chief communications and departmental updates',
      url: 'https://www.torontofirefighters.org/fccs',
      icon: 'document-text',
      category: 'Communications'
    },
    {
      title: 'Training Notes',
      description: 'Training materials, procedures, and educational resources',
      url: 'https://www.torontofirefighters.org/training',
      icon: 'school',
      category: 'Training'
    },
    {
      title: 'Calls Database',
      description: 'Access call logs, incident reports, and response data',
      url: 'https://calls.stoehr.ca/index.php',
      icon: 'radio',
      category: 'Operations'
    },
    {
      title: 'Shift Calendar',
      description: 'View detailed shift schedules and rotation patterns',
      url: 'https://gtmaa.com/shift-calendar/',
      icon: 'calendar',
      category: 'Operations'
    },
    {
      title: 'Safety Protocols',
      description: 'Current safety guidelines and emergency procedures',
      url: 'https://www.torontofirefighters.org/safety',
      icon: 'shield-checkmark',
      category: 'Safety'
    },
    {
      title: 'Equipment Manuals',
      description: 'Equipment operation guides and maintenance schedules',
      url: 'https://www.torontofirefighters.org/equipment',
      icon: 'construct',
      category: 'Equipment'
    },
    {
      title: 'Member Benefits',
      description: 'Information about benefits, insurance, and member services',
      url: 'https://www.torontofirefighters.org/benefits',
      icon: 'card',
      category: 'Benefits'
    }
  ];

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, ResourceLink[]>);

  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.title}>Resource Links</Text>
      <Text style={commonStyles.textSecondary}>
        Quick access to important firefighter resources and training materials
      </Text>

      {Object.entries(groupedResources).map(([category, categoryResources]) => (
        <View key={category} style={{ marginTop: 24 }}>
          <Text style={[commonStyles.subtitle, { color: colors.accent, marginBottom: 12 }]}>
            {category}
          </Text>
          
          {categoryResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={commonStyles.card}
              onPress={() => handleLinkPress(resource.url, resource.title)}
            >
              <View style={commonStyles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
                  <Icon 
                    name={resource.icon as any} 
                    size={24} 
                    style={{ color: colors.accent, marginRight: 12, marginTop: 2 }} 
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                      {resource.title}
                    </Text>
                    <Text style={[commonStyles.textSecondary, { lineHeight: 18 }]}>
                      {resource.description}
                    </Text>
                  </View>
                </View>
                <Icon name="open-outline" size={20} style={{ color: colors.textSecondary }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt, marginTop: 24 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Icon name="information-circle" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Note</Text>
        </View>
        <Text style={commonStyles.textSecondary}>
          Some links may require authentication or VPN access when off-duty. 
          Contact IT Help (416-338-2255) for access issues.
        </Text>
      </View>
    </View>
  );
}