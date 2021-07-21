import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

interface CountProps {
  count: number,
}

export function Header({count} : CountProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>to.</Text>
        <Text style={[styles.headerText, { fontFamily: 'Poppins-SemiBold' }]}>do</Text>
      </View>
      
      <View style={styles.headerTask}>
        <Text style={styles.headerTextTask}>Você tem </Text>
        <Text style={styles.headerTextTaskNumber}>{count ? count : 0} Tarefas</Text>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#273FAD',
  },
  header: {
    paddingBottom: 44,
    paddingLeft: 20,
    backgroundColor: '#273FAD',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',  
  },
  headerTask: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',  
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
  },
  headerTextTask: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  headerTextTaskNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  }
});
