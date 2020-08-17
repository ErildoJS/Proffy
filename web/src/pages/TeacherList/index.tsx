import React, { useState, FormEvent } from 'react'
import {FiFilter} from 'react-icons/fi'

import TeacherItem, {Teacher} from '../../components/teacherItem'
import PageHeader from '../../components/page-header'

import './styles.css'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'


function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)//filtro nao esta visivel


    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)//o contrario de false
    }


    async function handleSearchTeachers(e: FormEvent) {
        e.preventDefault()

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
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis"
                headerRight={(
                    <button onClick={handleToggleFiltersVisible}> 
                        <FiFilter name="filter" size={20} color="#f15"  />
                    </button>
                )}
            >
                {isFiltersVisible && (
                    <form id="search-teachers" onClick={handleSearchTeachers}>
                    <Select 
                         name="subject" 
                         label="Matéria"
                         value={subject}
                         onChange={(e) => {setSubject(e.target.value)}}
                         options={[
                             {value: 'Artes', label: 'Artes'},
                             {value: 'React js', label: 'React js'},
                             {value: 'Php', label: 'Php'},
                             {value: 'Ruby', label: 'Ruby'},
                             {value: 'C++', label: 'C++'},
                             {value: 'Banco de Dados', label: 'Banco de Dados'},
                             {value: 'Arquitecture Design', label: 'Arquitecture Design'},
                             {value: 'Hospedagem', label: 'Hospedagem'},
                             {value: 'Geografia', label: 'Geografia'},
                         ]}
                         />
                         <Select 
                         name="week_day" 
                         label="Dia da semana"
                         value={week_day}
                         onChange={(e) => {setWeekDay(e.target.value)}}
                         options={[
                             {value: '0', label: 'Domingo'},
                             {value: '1', label: 'Seguna-feira'},
                             {value: '2', label: 'Terça-feira'},
                             {value: '3', label: 'Quarta-feira'},
                             {value: '4', label: 'Quinta-feira'},
                             {value: '5', label: 'Sexta-feira'},
                             {value: '6', label: 'Sabado'},
                         ]}
                         />
                        <Input type="time" label="Hora" name="time"
                        value={time}
                        onChange={(e) => {setTime(e.target.value)}}
                        />
    
                        <button type="submit">Buscar</button>
    
                        
                    </form>
                )}
                
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                 return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList