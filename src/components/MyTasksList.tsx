import React, {useState} from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Image, TextInput } from 'react-native';

import TrashIcon from '../assets/icons/Trash.png';
import TrashDisabledIcon from '../assets/icons/TrashDisabled.png';
import RectangleIcon from '../assets/icons/Rectangle.png'
import EditIcon from '../assets/icons/Edit.png';
import XIcon from '../assets/icons/X.png';

function FlatListHeaderComponent() {
  return (
    <View>
      <Text style={styles.header}>Minhas tasks</Text>
    </View>
  )
}

interface MyTasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
    edit: boolean;
  }[];
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
  onPressEdit: (id: number) => void;
  onPressEditApply: (id: number, editTask: string) => void;
}

export function MyTasksList({ tasks, onLongPress, onPress, onPressEdit, onPressEditApply }: MyTasksListProps) {
  const [editTask, setEditTask] = useState('');

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={({ item, index }) => {
        return (
          <View style={styles.container}>
            {item.edit ? (
              <TextInput 
                style={styles.containerInput}
                value={editTask}
                onChangeText={setEditTask}
                onSubmitEditing={() => {onPressEditApply(item.id, editTask)}}
                autoFocus={true}
              />
            ) : (
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                //TODO - use onPress, onLongPress and style props
                onPress={() => {onPress(item.id)}}
                style={item.done === true ? styles.taskButtonDone : styles.taskButton}
              >
                <View 
                  testID={`marker-${index}`}
                  //TODO - use style prop 
                  style={item.done === true ? styles.taskMarkerDone :styles.taskMarker}
                />
                <Text 
                    //TODO - use style prop
                    style={item.done === true ? styles.taskTextDone :styles.taskText}
                  >
                    {item.title}
                  </Text>
                
              </TouchableOpacity>
            )}
            
            <View style={[styles.containerIcons, item.done === true && {backgroundColor: 'rgba(25, 61, 223, 0.1)'}]}>   
              <TouchableOpacity onPress={() => {onPressEdit(item.id), setEditTask(item.title)}} disabled={item.done}>
                <Image source={item.edit === true ? XIcon : EditIcon} />
                </TouchableOpacity>                       
              <Image source={RectangleIcon} />
              <TouchableOpacity onPress={() => {onLongPress(item.id)}} disabled={item.edit}>
                <Image source={item.edit ? TrashDisabledIcon : TrashIcon} />
              </TouchableOpacity>              
            </View>
          </View>
        )
      }}
      ListHeaderComponent={<FlatListHeaderComponent />}
      ListHeaderComponentStyle={{
        marginBottom: 20
      }}
      style={{
        marginHorizontal: 24,
        marginTop: 32
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  containerInput: {
    width: 265,
  },
  containerIcons: {
    height: 42,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 100,    
  },
  header: {
    color: '#3D3D4D',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D3D4D',
    marginRight: 10
  },
  taskText: {
    color: '#3D3D4D',
  },
  taskButtonDone: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(25, 61, 223, 0.1)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#273FAD',
    marginRight: 10
  },
  taskTextDone: {
    color: '#A09CB1',
    textDecorationLine: 'line-through'
  }
})