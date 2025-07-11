import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

export default function ActiveIncidents() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    console.log('ActiveIncidents component mounted');
    setLastUpdated(new Date());
  }, []);

  const handleWebViewLoad = () => {
    console.log('WebView loaded successfully');
    setIsLoading(false);
    setHasError(false);
    setLastUpdated(new Date());
  };

  const handleWebViewError = (error: any) => {
    console.error('WebView error:', error);
    setIsLoading(false);
    setHasError(true);
    Alert.alert(
      'Connection Error',
      'Unable to load active incidents. Please check your internet connection and try again.',
      [{ text: 'OK' }]
    );
  };

  const handleRefresh = () => {
    console.log('Refreshing active incidents');
    setIsLoading(true);
    setHasError(false);
    setLastUpdated(new Date());
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    return lastUpdated.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  if (Platform.OS === 'web') {
    return (
      <ScrollView style={commonStyles.section}>
        <Text style={commonStyles.title}>Active Incidents</Text>
        
        {/* Header Info */}
        <View style={[commonStyles.card, { marginBottom: 16 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Icon name="flame" size={24} style={{ color: colors.accent, marginRight: 8 }} />
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600' }]}>
              Toronto Fire Active Incidents
            </Text>
          </View>
          
          <View style={{ 
            backgroundColor: colors.cardBackground, 
            borderRadius: 8, 
            padding: 12, 
            marginBottom: 12,
            borderLeftWidth: 4,
            borderLeftColor: '#FF6B35'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Icon name="information-circle" size={16} style={{ color: '#FF6B35', marginRight: 6 }} />
              <Text style={[commonStyles.text, { fontSize: 14, fontWeight: '600' }]}>
                Web Platform Notice
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 13, lineHeight: 18, marginBottom: 12 }]}>
              The live incidents feed is not supported on web in Natively. Please use the mobile app 
              or access the website directly for real-time incident information.
            </Text>
            
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: '#FF6B35', marginBottom: 0 }]}
              onPress={() => {
                if (Platform.OS === 'web') {
                  window.open('https://www.toronto.ca/community-people/public-safety-alerts/alerts-notifications/toronto-fire-active-incidents/', '_blank');
                }
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="open-outline" size={20} style={{ color: colors.background, marginRight: 8 }} />
                <Text style={[commonStyles.buttonText, { color: colors.background }]}>
                  Open Website
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={[commonStyles.section, { flex: 1 }]}>
      {/* Header */}
      <View style={[commonStyles.card, { marginBottom: 12 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Icon name="flame" size={20} style={{ color: colors.accent, marginRight: 8 }} />
            <Text style={[commonStyles.text, { fontSize: 16, fontWeight: '600' }]}>
              Active Incidents
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={handleRefresh}
            style={{
              backgroundColor: colors.accent,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Icon name="refresh" size={14} style={{ color: colors.background, marginRight: 4 }} />
            <Text style={[commonStyles.buttonText, { color: colors.background, fontSize: 12 }]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
            Last updated: {formatLastUpdated()}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: hasError ? '#FF4444' : isLoading ? '#FFAA00' : '#44AA44',
              marginRight: 4
            }} />
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              {hasError ? 'Error' : isLoading ? 'Loading' : 'Live'}
            </Text>
          </View>
        </View>
      </View>

      {/* WebView Container */}
      <View style={{
        flex: 1,
        backgroundColor: colors.cardBackground,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        minHeight: screenHeight * 0.6
      }}>
        {isLoading && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.cardBackground,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1
          }}>
            <Icon name="refresh" size={32} style={{ color: colors.accent, marginBottom: 8 }} />
            <Text style={[commonStyles.text, { fontSize: 16, fontWeight: '600' }]}>
              Loading Active Incidents...
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 14, textAlign: 'center', marginTop: 4 }]}>
              Fetching live data from Toronto Fire Services
            </Text>
          </View>
        )}

        {hasError && (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }}>
            <Icon name="warning" size={48} style={{ color: '#FF6B35', marginBottom: 16 }} />
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 8 }]}>
              Unable to Load Incidents
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 14, textAlign: 'center', marginBottom: 16 }]}>
              There was an error loading the active incidents feed. Please check your internet connection and try again.
            </Text>
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: colors.accent }]}
              onPress={handleRefresh}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="refresh" size={16} style={{ color: colors.background, marginRight: 6 }} />
                <Text style={[commonStyles.buttonText, { color: colors.background }]}>
                  Try Again
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <WebView
          source={{ uri: 'https://www.toronto.ca/community-people/public-safety-alerts/alerts-notifications/toronto-fire-active-incidents/' }}
          style={{ flex: 1 }}
          onLoad={handleWebViewLoad}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          scalesPageToFit={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          bounces={false}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        />
      </View>

      {/* Footer Info */}
      <View style={[commonStyles.card, { marginTop: 8 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Icon name="information-circle" size={16} style={{ color: colors.accent, marginRight: 6 }} />
          <Text style={[commonStyles.text, { fontSize: 14, fontWeight: '600' }]}>
            Live Data Source
          </Text>
        </View>
        <Text style={[commonStyles.textSecondary, { fontSize: 12, lineHeight: 16 }]}>
          Data is provided directly from the Toronto Fire Services website and updates in real-time. 
          Incident information includes location, type, and current status of emergency responses.
        </Text>
      </View>
    </View>
  );
}