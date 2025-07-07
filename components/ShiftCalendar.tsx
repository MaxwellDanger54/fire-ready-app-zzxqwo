import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface ShiftDay {
  date: Date;
  shift: 'A' | 'B' | 'C' | 'D';
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

  const shiftPattern = ['A', 'B', 'C', 'D'] as const;

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
    
    // Reference date for shift calculation (January 1, 2024 was Shift A)
    const referenceDate = new Date(2024, 0, 1); // Jan 1, 2024
    const referenceShift = 0; // Shift A
    
    while (currentDate <= endDate) {
      const daysDiff = Math.floor((currentDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));
      const shiftIndex = (referenceShift + daysDiff) % 4;
      const shift = shiftPattern[shiftIndex < 0 ? shiftIndex + 4 : shiftIndex];
      
      const isToday = currentDate.toDateString() === today.toDateString();
      
      days.push({
        date: new Date(currentDate),
        shift,
        isToday
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    setCalendarDays(days);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {Object.entries(shiftColors).map(([shift, color]) => (
            <View key={shift} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: color,
                  borderRadius: 8,
                  marginRight: 6
                }}
              />
              <Text style={commonStyles.textSecondary}>Shift {shift}</Text>
            </View>
          ))}
        </View>
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
            const shiftColor = shiftColors[day.shift];
            
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
                      color: day.shift === 'D' ? colors.background : colors.text,
                      fontSize: 12,
                      fontWeight: day.isToday ? '700' : '500'
                    }}
                  >
                    {day.date.getDate()}
                  </Text>
                  <Text
                    style={{
                      color: day.shift === 'D' ? colors.background : colors.text,
                      fontSize: 10,
                      fontWeight: '600'
                    }}
                  >
                    {day.shift}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Today's Shift Info */}
      {(() => {
        const today = calendarDays.find(day => day.isToday);
        if (today) {
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
        }
        return null;
      })()}
    </View>
  );
}