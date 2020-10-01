import React, { FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import api from '../../services/api'

import './styles.css'

function TeacherList() {
    const [subject, setSubject] = React.useState('')
    const [weekDay, setWeekDay] = React.useState('')
    const [time, setTime] = React.useState('')

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()

        const resp = await api.get('classes', {
            params: {
                subject,
                week_day: weekDay,
                time
            }
        })

        console.log(resp.data)        
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Quimica', label: 'Quimica' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'História', label: 'História' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' }
                        ]} />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={weekDay}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-Feira' },
                            { value: '2', label: 'Terça-Feira' },
                            { value: '3', label: 'Quarta-Feira' },
                            { value: '4', label: 'Quinta-Feira' },
                            { value: '5', label: 'Sexta-Feira' },
                            { value: '6', label: 'Sábado' },
                        ]} />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                <TeacherItem />
            </main>
        </div>
    )
}

export default TeacherList