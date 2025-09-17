
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Linking, Alert, Platform, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import Button from './Button';
import { getCurrentShift } from './ShiftCalendar';
import { WebView } from 'react-native-webview';
import AnaphylaxisImageViewer from './AnaphylaxisImageViewer';
import ChildBirthImageViewer from './ChildBirthImageViewer';

export default function HomeInfo() {
  const [isAnaphylaxisModalVisible, setIsAnaphylaxisModalVisible] = useState(false);
  const [isChildBirthModalVisible, setIsChildBirthModalVisible] = useState(false);
  
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

  const handleLinkPress = (url: string, title: string) => {
    console.log('Opening link:', url);
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(
            'Cannot Open Link',
            `Unable to open ${title}. Please check your internet connection or try again later.`,
            [{ text: 'OK' }]
          );
        }
      })
      .catch((err) => {
        console.error('Error opening link:', err);
        Alert.alert(
          'Error',
          `Failed to open ${title}. Please try again.`,
          [{ text: 'OK' }]
        );
      });
  };

  const handleMedicalDirectivePress = (type: string) => {
    console.log(`${type} medical directive pressed`);
    
    if (type === 'Anaphylaxis') {
      setIsAnaphylaxisModalVisible(true);
    } else if (type === 'Child Birth') {
      setIsChildBirthModalVisible(true);
    } else {
      Alert.alert(
        `${type} Protocol`,
        `Opening ${type} medical directive information...`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'View Protocol', 
            onPress: () => {
              // For now, we'll show an alert. In a real app, this would navigate to specific protocol pages
              Alert.alert(
                `${type} Medical Directive`,
                `This would display the ${type} medical protocol and procedures.`,
                [{ text: 'OK' }]
              );
            }
          }
        ]
      );
    }
  };

  const shiftInfo = getShiftDisplayInfo();

  return (
    <ScrollView style={commonStyles.section}>
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

      {/* TFS Medical Directives - Moved above Exposure Report */}
      <View style={[commonStyles.card, { marginTop: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Icon name="medical" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>TFS Medical Directives</Text>
        </View>
        <TouchableOpacity
          style={[commonStyles.button, { backgroundColor: colors.primary, marginBottom: 12 }]}
          onPress={() => handleLinkPress('https://drive.google.com/file/d/1ejyjd4I_-1lHdYY3RcGnd1dG7fUQzKop/view?usp=sharing', 'TFS Medical Directives')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="medical" size={20} style={{ color: colors.background, marginRight: 8 }} />
            <Text style={[commonStyles.buttonText, { color: colors.background }]}>
              View Medical Directives
            </Text>
            <Icon name="open-outline" size={16} style={{ color: colors.background, marginLeft: 8 }} />
          </View>
        </TouchableOpacity>

        {/* Medical Directive Buttons */}
        <View style={{ gap: 8 }}>
          <Button
            text="Anaphylaxis"
            onPress={() => handleMedicalDirectivePress('Anaphylaxis')}
            style={{ 
              backgroundColor: colors.accent,
              marginTop: 0
            }}
            textStyle={{ color: colors.background }}
          />
          
          <Button
            text="Child Birth"
            onPress={() => handleMedicalDirectivePress('Child Birth')}
            style={{ 
              backgroundColor: colors.secondary,
              marginTop: 0
            }}
            textStyle={{ color: colors.background }}
          />
          
          <Button
            text="Opioid"
            onPress={() => handleMedicalDirectivePress('Opioid')}
            style={{ 
              backgroundColor: '#FF6B35',
              marginTop: 0
            }}
            textStyle={{ color: colors.background }}
          />
        </View>

        <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center', marginTop: 12 }]}>
          Access TFS medical directives and protocols
        </Text>
      </View>

      {/* Exposure Report Form - Now positioned after TFS Medical Directives */}
      <View style={[commonStyles.card, { marginTop: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Icon name="document-text" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Exposure Report Form</Text>
        </View>
        <TouchableOpacity
          style={[commonStyles.button, { backgroundColor: colors.accent, marginBottom: 0 }]}
          onPress={() => handleLinkPress('https://www.emailmeform.com/builder/form/1u5eAoCLK46Wf37pcGca5F', 'Exposure Report Form')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="document-text" size={20} style={{ color: colors.background, marginRight: 8 }} />
            <Text style={[commonStyles.buttonText, { color: colors.background }]}>
              Exposure Report
            </Text>
            <Icon name="open-outline" size={16} style={{ color: colors.background, marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
        <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center', marginTop: 8 }]}>
          Click to access the exposure report form
        </Text>
      </View>

      {/* TFS Calls Website */}
      <View style={[commonStyles.card, { marginTop: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Icon name="call" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>TFS Calls</Text>
        </View>
        <TouchableOpacity
          style={[commonStyles.button, { backgroundColor: colors.primary, marginBottom: 0 }]}
          onPress={() => handleLinkPress('https://calls.stoehr.ca/index.php', 'TFS Calls')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="call" size={20} style={{ color: colors.background, marginRight: 8 }} />
            <Text style={[commonStyles.buttonText, { color: colors.background }]}>
              Access TFS Calls
            </Text>
            <Icon name="open-outline" size={16} style={{ color: colors.background, marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
        <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center', marginTop: 8 }]}>
          Access call information and data
        </Text>
      </View>

      {/* Fire Hall Meals */}
      <View style={[commonStyles.card, { marginTop: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Icon name="restaurant" size={20} style={{ color: colors.accent, marginRight: 8 }} />
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Fire Hall Meals</Text>
        </View>
        <TouchableOpacity
          style={[commonStyles.button, { backgroundColor: colors.secondary, marginBottom: 0 }]}
          onPress={() => handleLinkPress('https://drive.google.com/drive/folders/14Q94zwAusBnpA2Wk7a0Ja_ZjwZNY08Cf?usp=sharing', 'Fire Hall Meals')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="restaurant" size={20} style={{ color: colors.background, marginRight: 8 }} />
            <Text style={[commonStyles.buttonText, { color: colors.background }]}>
              Access Meal Plans
            </Text>
            <Icon name="open-outline" size={16} style={{ color: colors.background, marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
        <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center', marginTop: 8 }]}>
          Access fire hall meal planning resources
        </Text>
      </View>

      {/* Modal Components */}
      <AnaphylaxisImageViewer
        visible={isAnaphylaxisModalVisible}
        onClose={() => setIsAnaphylaxisModalVisible(false)}
      />

      <ChildBirthImageViewer
        visible={isChildBirthModalVisible}
        onClose={() => setIsChildBirthModalVisible(false)}
      />
    </ScrollView>
  );
}
