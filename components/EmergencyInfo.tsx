import { Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

export default function EmergencyInfo() {
  const handleEmergencyCall = (number: string, description: string) => {
    Alert.alert(
      'Emergency Call',
      `Call ${description}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          style: 'destructive',
          onPress: () => Linking.openURL(`tel:${number}`)
        }
      ]
    );
  };

  const emergencyNumbers = [
    { name: 'Emergency Services', number: '911', icon: 'warning', color: colors.danger },
    { name: 'Kids Help Line', number: '1-800-668-6868', icon: 'heart', color: colors.accent },
    { name: 'One Call Ontario', number: '1-800-400-2255', icon: 'call', color: colors.primary },
  ];

  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.title}>Emergency Information</Text>
      
      {emergencyNumbers.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[commonStyles.card, { borderLeftWidth: 4, borderLeftColor: item.color }]}
          onPress={() => handleEmergencyCall(item.number, item.name)}
        >
          <View style={commonStyles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Icon name={item.icon as any} size={24} style={{ color: item.color, marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  {item.name}
                </Text>
                <Text style={commonStyles.textSecondary}>{item.number}</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} style={{ color: colors.textSecondary }} />
          </View>
        </TouchableOpacity>
      ))}

      <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt, marginTop: 20 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Icon name="information-circle" size={24} style={{ color: colors.accent, marginRight: 12 }} />
          <Text style={[commonStyles.subtitle, { marginBottom: 0 }]}>Quick Status</Text>
        </View>
        <View style={commonStyles.row}>
          <Text style={commonStyles.text}>Current Status:</Text>
          <View style={{ 
            backgroundColor: colors.success, 
            paddingHorizontal: 12, 
            paddingVertical: 4, 
            borderRadius: 12 
          }}>
            <Text style={[commonStyles.textSecondary, { color: colors.text, fontSize: 12 }]}>
              ON DUTY
            </Text>
          </View>
        </View>
        <View style={commonStyles.row}>
          <Text style={commonStyles.text}>Last Update:</Text>
          <Text style={commonStyles.textSecondary}>
            {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </View>
  );
}