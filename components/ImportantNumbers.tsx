import { Text, View, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface ContactItem {
  name: string;
  number: string;
  description?: string;
}

export default function ImportantNumbers() {
  const handleCall = (number: string, name: string) => {
    Linking.openURL(`tel:${number}`);
  };

  // Contacts sorted alphabetically by name
  const contacts: ContactItem[] = [
    { name: 'ARNOLD LOUIE', number: '416-338-9071' },
    { name: 'BIO HAZARD BIN PICKUP', number: '905-789-6660' },
    { name: 'BIO HAZARD BIN PICKUP', number: '905-793-2966', description: 'EXT 21' },
    { name: 'COMMUNICATIONS', number: '8-9000 & 8-9001', description: 'CAPT LINE' },
    { name: 'DESIGNATED OFFICER', number: '416-338-1010' },
    { name: 'EAP/CIS', number: '8-9327' },
    { name: 'F.R.E.D.', number: '8-3733' },
    { name: 'FOOD BANK PICKUP', number: '416-203-0050' },
    { name: 'GARBAGE SPECIAL PICKUP', number: '416-338-2010' },
    { name: 'IT HELP', number: '416-338-2255' },
    { name: 'MECHANICAL', number: '416-338-9201', description: 'Main Line' },
    { name: 'MECHANICAL', number: '416-697-7946', description: 'Mobile' },
    { name: 'MECHANICAL', number: '416-338-9202', description: 'Secondary' },
    { name: 'PAYROLL (EAST)', number: '416-338-9118' },
    { name: 'POISON CONTROL', number: '416-813-5900' },
    { name: 'QUARTERMASTER', number: '416-338-9303', description: 'CLOTHING' },
    { name: 'QUARTERMASTER', number: '416-338-9300', description: 'SUPPLIES' },
    { name: 'QUATTRO HELP', number: '416-338-9400' },
    { name: 'RADIO/P.A./PHONE REPAIRS', number: '416-338-9002' },
    { name: 'RMS HELP', number: '416-338-9508' },
    { name: 'ROTHERHAM', number: '416-338-9205' },
    { name: 'ROTHERHAM', number: '416-338-9219', description: 'DOWNSTAIRS' },
    { name: 'SCBA ROOM TORYORK', number: '416-338-9931' },
    { name: 'SHOE TRUCK', number: '416-407-5513' },
    { name: 'TIRE REPAIRS', number: '416-842-1320' },
  ];

  const getIconForContact = (name: string) => {
    const iconMap: { [key: string]: string } = {
      'COMMUNICATIONS': 'radio',
      'F.R.E.D.': 'medical',
      'MECHANICAL': 'construct',
      'DESIGNATED OFFICER': 'person',
      'BIO HAZARD': 'warning',
      'QUARTERMASTER': 'shirt',
      'PAYROLL': 'card',
      'FOOD BANK': 'restaurant',
      'IT HELP': 'laptop',
      'QUATTRO HELP': 'help-circle',
      'RMS HELP': 'desktop',
      'SHOE TRUCK': 'car',
      'RADIO': 'radio',
      'TIRE REPAIRS': 'car-sport',
      'SCBA ROOM': 'fitness',
      'GARBAGE': 'trash',
      'POISON CONTROL': 'medical',
      'EAP/CIS': 'people',
      'ARNOLD': 'person',
    };
    
    return iconMap[name.split(' ')[0]] || 'call';
  };

  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.title}>Important Numbers</Text>
      <Text style={commonStyles.textSecondary}>
        Tap any number to call directly
      </Text>
      
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 16 }}>
        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={commonStyles.card}
            onPress={() => handleCall(contact.number, contact.name)}
          >
            <View style={commonStyles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Icon 
                  name={getIconForContact(contact.name) as any} 
                  size={20} 
                  style={{ color: colors.accent, marginRight: 12 }} 
                />
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                    {contact.name}
                  </Text>
                  {contact.description && (
                    <Text style={[commonStyles.textSecondary, { fontSize: 12, marginBottom: 4 }]}>
                      {contact.description}
                    </Text>
                  )}
                  <Text style={[commonStyles.textSecondary, { fontWeight: '500' }]}>
                    {contact.number}
                  </Text>
                </View>
              </View>
              <Icon name="call" size={18} style={{ color: colors.primary }} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}