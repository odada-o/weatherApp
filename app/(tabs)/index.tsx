import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  Switch,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
  Alert
} from 'react-native';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // 날씨 데이터 (실제로는 API에서 받아와야 함)
  const weatherData = {
    current: { temp: 23, condition: '맑음' },
    hourly: [
      { time: '09:00', temp: 22, condition: '맑음' },
      { time: '12:00', temp: 25, condition: '구름조금' },
      { time: '15:00', temp: 26, condition: '흐림' },
      { time: '18:00', temp: 23, condition: '비' },
      { time: '21:00', temp: 21, condition: '맑음' },
    ]
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // 실제로는 여기서 날씨 데이터를 다시 불러옴
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("새로고침 완료", "날씨 정보가 업데이트되었습니다.");
    }, 1000);
  }, []);

  const updateWeather = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("업데이트 완료", "날씨 정보가 업데이트되었습니다.");
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ImageBackground
        source={{ uri: 'https://picsum.photos/400/800' }}
        style={styles.backgroundImage}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* 현재 날씨 */}
          <View style={styles.currentWeather}>
            <Text style={[styles.temp, isDarkMode && styles.darkText]}>
              {weatherData.current.temp}°C
            </Text>
            <Text style={[styles.condition, isDarkMode && styles.darkText]}>
              {weatherData.current.condition}
            </Text>
          </View>

          {/* 설정 버튼 */}
          <View style={styles.settingsContainer}>
            <Text style={[styles.settingsText, isDarkMode && styles.darkText]}>
              다크모드
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>

          {/* 업데이트 버튼 */}
          <Pressable
            style={({ pressed }) => [
              styles.updateButton,
              pressed && styles.buttonPressed
            ]}
            onPress={updateWeather}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.updateButtonText}>날씨 업데이트</Text>
            )}
          </Pressable>

          {/* 시간별 날씨 */}
          <Text style={[styles.hourlyTitle, isDarkMode && styles.darkText]}>
            시간별 날씨
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {weatherData.hourly.map((item, index) => (
              <Pressable
                key={index}
                style={styles.hourlyItem}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.hourlyTime}>{item.time}</Text>
                <Text style={styles.hourlyTemp}>{item.temp}°C</Text>
                <Text style={styles.hourlyCondition}>{item.condition}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* 상세 정보 모달 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>상세 날씨 정보</Text>
              <Text style={styles.modalContent}>
                습도: 65%{'\n'}
                풍속: 3m/s{'\n'}
                기압: 1013hPa
              </Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>닫기</Text>
              </Pressable>
            </View>
          </Modal>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  currentWeather: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  temp: {
    fontSize: 48,
    color: '#000',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 24,
    color: '#000',
    marginTop: 10,
  },
  darkText: {
    color: '#fff',
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  settingsText: {
    marginRight: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hourlyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  hourlyItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
  },
  hourlyTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hourlyTemp: {
    fontSize: 20,
    marginVertical: 5,
  },
  hourlyCondition: {
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});