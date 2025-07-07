import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface ShiftDay {
  date: Date;
  shift: 'A' | 'B' | 'C' | 'D' | null;
  isToday: boolean;
}

export default function ShiftCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<ShiftDay[]>([]);
  const [showWebView, setShowWebView] = useState(false);

  const shiftColors = {
    A: '#FF4444', // Red
    B: '#888888', // Grey
    C: '#4444FF', // Blue
    D: '#FFDD44'  // Yellow
  };

  // A shift working days pattern: Tuesday, Monday, Thursday, Friday, Sunday, Wednesday, Saturday
  // Day of week mapping: Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6
  const aShiftDaysOfWeek = [2, 1, 4, 5, 0, 3, 6]; // Tuesday, Monday, Thursday, Friday, Sunday, Wednesday, Saturday

  const getShiftForDate = (date: Date): 'A' | 'B' | 'C' | 'D' | null => {
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Check if this day of the week is an A shift day
    if (aShiftDaysOfWeek.includes(dayOfWeek)) {
      return 'A';
    }
    
    return null;
  };

  // Export function to get current shift for use in other components
  const getCurrentShift = (): 'A' | 'B' | 'C' | 'D' | null => {
    return getShiftForDate(new Date());
  };

  useEffect(() => {
    generateCalendar();
  }, [currentMonth]);

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and adjust for Monday start
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Calculate days to show (including previous/next month days for full weeks)
    const startDate = new Date(firstDay);
    const dayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    startDate.setDate(startDate.getDate() - dayOfWeek);
    
    const endDate = new Date(lastDay);
    const endDayOfWeek = (lastDay.getDay() + 6) % 7;
    endDate.setDate(endDate.getDate() + (6 - endDayOfWeek));
    
    const days: ShiftDay[] = [];
    const currentDate = new Date(startDate);
    const today = new Date();
    
    while (currentDate <= endDate) {
      const shift = getShiftForDate(currentDate);
      const isToday = currentDate.toDateString() === today.toDateString();
      
      days.push({
        date: new Date(currentDate),
        shift,
        isToday
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    setCalendarDays(days);
    console.log('Generated calendar for', formatMonth(currentMonth), 'with', days.length, 'days');
    console.log('Current shift:', getCurrentShift());
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
    console.log('Navigating to', direction, 'month:', formatMonth(newMonth));
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  if (showWebView) {
    return (
      <View style={commonStyles.section}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => setShowWebView(false)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon name="arrow-back" size={24} style={{ color: colors.accent, marginRight: 8 }} />
            <Text style={[commonStyles.text, { color: colors.accent }]}>Back to Calendar</Text>
          </TouchableOpacity>
        </View>
        
        {Platform.OS === 'web' ? (
          <View style={[commonStyles.card, { padding: 20, alignItems: 'center' }]}>
            <Icon name="globe" size={48} style={{ color: colors.accent, marginBottom: 16 }} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 8 }]}>
              Web View Not Available
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 16 }]}>
              The shift calendar website cannot be displayed in the web version of this app.
            </Text>
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: colors.accent }]}
              onPress={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://gtmaa.com/shift-calendar/', '_blank');
                }
              }}
            >
              <Text style={[commonStyles.buttonText, { color: colors.background }]}>
                Open in Browser
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1, height: 600 }}>
            <WebView
              source={{ uri: 'https://gtmaa.com/shift-calendar/' }}
              style={{ flex: 1 }}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={[commonStyles.card, { alignItems: 'center', justifyContent: 'center', height: 200 }]}>
                  <Text style={commonStyles.textSecondary}>Loading shift calendar...</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={commonStyles.section}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={commonStyles.title}>Shift Calendar</Text>
        <TouchableOpacity
          onPress={() => setShowWebView(true)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={[commonStyles.text, { color: colors.accent, marginRight: 4 }]}>Full View</Text>
          <Icon name="open-outline" size={16} style={{ color: colors.accent }} />
        </TouchableOpacity>
      </View>

      {/* Month Navigation */}
      <View style={[commonStyles.card, { marginBottom: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigateMonth('prev')}
            style={{ padding: 8 }}
          >
            <Icon name="chevron-back" size={24} style={{ color: colors.accent }} />
          </TouchableOpacity>
          
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600' }]}>
            {formatMonth(currentMonth)}
          </Text>
          
          <TouchableOpacity
            onPress={() => navigateMonth('next')}
            style={{ padding: 8 }}
          >
            <Icon name="chevron-forward" size={24} style={{ color: colors.accent }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Shift Legend */}
      <View style={[commonStyles.card, { marginBottom: 16 }]}>
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>Shift Legend</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: shiftColors.A,
              borderRadius: 8,
              marginRight: 6
            }}
          />
          <Text style={commonStyles.textSecondary}>Shift A (Red)</Text>
        </View>
        <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 8 }]}>
          Only A shift is displayed. Other shifts (B, C, D) are not shown.
        </Text>
      </View>

      {/* Calendar Grid */}
      <View style={commonStyles.card}>
        {/* Day Headers */}
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <View key={day} style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}>
              <Text style={[commonStyles.textSecondary, { fontSize: 12, fontWeight: '600' }]}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {calendarDays.map((day, index) => {
            const isCurrentMonthDay = isCurrentMonth(day.date);
            const shiftColor = day.shift ? shiftColors[day.shift] : colors.cardBackground;
            
            return (
              <View
                key={index}
                style={{
                  width: '14.28%', // 100% / 7 days
                  aspectRatio: 1,
                  padding: 2
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: shiftColor,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isCurrentMonthDay ? 1 : 0.3,
                    borderWidth: day.isToday ? 2 : 0,
                    borderColor: colors.text
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 12,
                      fontWeight: day.isToday ? '700' : '500'
                    }}
                  >
                    {day.date.getDate()}
                  </Text>
                  {day.shift && (
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 10,
                        fontWeight: '600'
                      }}
                    >
                      {day.shift}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Today's Shift Info */}
      {(() => {
        const today = calendarDays.find(day => day.isToday);
        if (today && today.shift) {
          return (
            <View style={[commonStyles.card, { marginTop: 16, backgroundColor: shiftColors[today.shift] + '20' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: shiftColors[today.shift],
                    borderRadius: 12,
                    marginRight: 12
                  }}
                />
                <View>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    Today&apos;s Shift: {today.shift}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {today.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
              </View>
            </View>
          );
        } else if (today) {
          return (
            <View style={[commonStyles.card, { marginTop: 16, backgroundColor: colors.cardBackground + '80' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: colors.textSecondary,
                    borderRadius: 12,
                    marginRight: 12
                  }}
                />
                <View>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    No Shift Today
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {today.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
              </View>
            </View>
          );
        }
        return null;
      })()}

      {/* A Shift Pattern Info */}
      <View style={[commonStyles.card, { marginTop: 16, backgroundColor: colors.cardBackground + '80' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Icon name="information-circle" size={20} style={{ color: colors.accent, marginRight: 8, marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.text, { fontSize: 14, fontWeight: '600', marginBottom: 8 }]}>
              A Shift Schedule Pattern
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginBottom: 4 }]}>
              A shift works on the following days of the week:
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginBottom: 8 }]}>
              Tuesday → Monday → Thursday → Friday → Sunday → Wednesday → Saturday
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginBottom: 4 }]}>
              This pattern repeats every week.
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              Only A shift is displayed in red. Other shifts are not shown.
            </Text>
          </View>
        </View>
      </View>

      {/* Reference Note */}
      <View style={[commonStyles.card, { marginTop: 16, backgroundColor: colors.cardBackground + '80' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="link" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              Simplified A shift calendar based on custom schedule
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              Tap &quot;Full View&quot; for the complete online calendar
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// Export the getCurrentShift function for use in other components
export const getCurrentShift = (): 'A' | 'B' | 'C' | 'D' | null => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  
  // A shift working days pattern: Tuesday, Monday, Thursday, Friday, Sunday, Wednesday, Saturday
  const aShiftDaysOfWeek = [2, 1, 4, 5, 0, 3, 6]; // Tuesday, Monday, Thursday, Friday, Sunday, Wednesday, Saturday
  
  // Check if this day of the week is an A shift day
  if (aShiftDaysOfWeek.includes(dayOfWeek)) {
    return 'A';
  }
  
  return null;
};