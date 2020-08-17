import React from 'react'
import { useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import PageHeader from '../../components/PgeHeader'
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'

import TeacherItem, { Teacher } from '../../components/TeacherItem'
import styles from  './styles'
import {Feather} from '@expo/vector-icons'
import api from '../../services/api'
import { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'

function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)//filtro nao esta visivel
    const [favorites, setFavorites] = useState<number[]>([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id//id do users favoritados
                })
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)//o contrario de false
    }

    async function handleFiltersSubmit() {
        loadFavorites()
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })
        setIsFiltersVisible(false)//depois do submit excondo os botoes

        setTeachers(response.data)
    }

    
    
    return ( 
    <View style={styles.container}>
        <PageHeader 
        title="Proffys disponíveis"
         headerRight={(
             <BorderlessButton onPress={handleToggleFiltersVisible}>
                 <Feather name="filter" size={20} color="#fff" />
             </BorderlessButton>
         )}>
            {isFiltersVisible && (//so mostro o conteudo caso haja filtros
            <View style={styles.searchForm}>
                <Text style={styles.label}>Materia</Text>
                <TextInput 
                style={styles.input}
                value={subject}
                onChangeText={text => setSubject(text)}
                placeholder="qual a materia"
                placeholderTextColor="#c1bcc"
                />

                <View style={styles.inputGroup}>
                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da semana</Text>
                        <TextInput 
                        style={styles.input}
                        value={week_day}
                        onChangeText={text => setWeekDay(text)}
                        placeholder="Qual o dia"
                        placeholderTextColor="#c1bcc"
                        />      
                    </View>

                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>horario</Text>
                        <TextInput 
                        style={styles.input}
                        value={time}
                        onChangeText={text => setTime(text)}
                        placeholder="Qual horario"
                        placeholderTextColor="#c1bcc"
                        />      
                    </View>
                </View>

                <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                    <Text style={styles.submitButtonText}>Filtrar</Text>
                </RectButton>
            </View>
            )}
        </PageHeader>

        <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}//estilo pro conteudo da scrollview
        >

            {teachers.map((teacher: Teacher) => {
             return 
             (
             <TeacherItem key={teacher.id} teacher={teacher}
                favorited={favorites.includes(teacher.id)}
             />
             )
             
            })}

        </ScrollView>
        
    </View>
    )
}

export default TeacherList