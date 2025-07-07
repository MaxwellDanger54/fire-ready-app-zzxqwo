import { Text, View } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { getCurrentShift } from './ShiftCalendar';

export default function HomeInfo() {
  const currentShift = getCurrentShift();
  const currentDate = new Date();

  const shiftColors = {
    A: '#FF4444', // Red
    B: '#888888', // Grey
    C: '#4444FF', // Blue
    D: '#FFDD44'  // Yellow
  };

  const getShiftDisplayInfo = () => {
    if (currentShift) {
      return {
        shift: currentShift,
        color: shiftColors[currentShift],
        status: `Shift ${currentShift} Working`,
        description: 'Current shift on duty'
      };
    } else {
      return {
        shift: null,
        color: colors.textSecondary,
        status: 'No Shift Working',
        description: 'All shifts off duty'
      };
    }
  };

  const shiftInfo = getShiftDisplayInfo();

  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.title}>Current Shift Status</Text>
      
      {/* Current Shift Display */}
      <View style={[commonStyles.card, { backgroundColor: shiftInfo.color + '20', borderLeftWidth: 4, borderLeftColor: shiftInfo.color }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: shiftInfo.color,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16
            }}
          >
            {currentShift ? (
              <Text style={{ 
                color: currentShift === 'D' ? colors.background : colors.text, 
                fontSize: 20, 
                fontWeight: '700' 
              }}>
                {currentShift}
              </Text>
            ) : (
              <Icon name="time" size={24} style={{ color: colors.text }} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', marginBottom: 4 }]}>
              {shiftInfo.status}
            </Text>
            <Text style={commonStyles.textSecondary}>
              {shiftInfo.description}
            </Text>
          </View>
        </View>

        {/* Date and Time Info */}
        <View style={{ borderTopWidth: 1, borderTopColor: colors.cardBackground, paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Date:</Text>
            <Text style={commonStyles.text}>
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Time:</Text>
            <Text style={commonStyles.text}>
              {currentDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              })}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={commonStyles.textSecondary}>Shift Change:</Text>
            <Text style={commonStyles.text}>07:00 hrs daily</Text>
          </View>
        </View>
      </View>

      {/* Shift Legend */}
      <View style={[commonStyles.card, { marginTop: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Icon name="color-palette" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Shift Colors</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {Object.entries(shiftColors).map(([shift, color]) => (
            <View key={shift} style={{ flexDirection: 'row', alignItems: 'center', minWidth: '45%' }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: color,
                  borderRadius: 10,
                  marginRight: 8,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ 
                  color: shift === 'D' ? colors.background : colors.text, 
                  fontSize: 12, 
                  fontWeight: '600' 
                }}>
                  {shift}
                </Text>
              </View>
              <Text style={commonStyles.textSecondary}>Shift {shift}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Info */}
      <View style={[commonStyles.card, { marginTop: 16, backgroundColor: colors.backgroundAlt }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Icon name="information-circle" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Shift Information</Text>
        </View>
        <Text style={[commonStyles.textSecondary, { fontSize: 14, lineHeight: 20 }]}>
          Toronto Fire operates on a 28-day rotation cycle with 4 shifts (A, B, C, D). 
          Each shift works 2 days, then has 2 days off, in a staggered pattern. 
          Shifts change at 07:00 hrs each morning.
        </Text>
      </View>
    </View>
  );
}