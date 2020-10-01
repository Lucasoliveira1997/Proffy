import React from 'react'

import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'

import './styles.css'

function TeacherForm() {
    const history = useHistory()

    const [name, setName] = React.useState('')
    const [avatar, setavatar] = React.useState('')
    const [whatsapp, setWhatsapp] = React.useState('')
    const [bio, setBio] = React.useState('')

    const [subject, setSubject] = React.useState('')
    const [cost, setCost] = React.useState('')

    const [scheduleItems, setScheduleItems] = React.useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addScheduleItem() {
        setScheduleItems([
            ...scheduleItems, { week_day: 0, from: '', to: '' }
        ])
    }
    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: React.FormEvent) {
        e.preventDefault()

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
        .then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/')
        })            
        .catch(() => alert('Erro no cadastro!'))
        
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo, é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input
                            label="Nome Completo"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={(e) => setavatar(e.target.value)}
                        />
                        <Input
                            label="WhatsApp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <TextArea
                            label="Biografia"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a Aula</legend>
                        <Select
                            label="Matéria"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={
                                [
                                    { value: 'Matemática', label: 'Matemática' },
                                    { value: 'Português', label: 'Português' },
                                    { value: 'Quimica', label: 'Quimica' },
                                    { value: 'Biologia', label: 'Biologia' },
                                    { value: 'História', label: 'História' },
                                    { value: 'Física', label: 'Física' },
                                    { value: 'Geografia', label: 'Geografia' }
                                ]
                            } />
                        <Input
                            label="Custo da sua hora por aula"
                            name="cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        <button type="button" onClick={addScheduleItem}>+ Novo Horário</button>
                        </legend>
                        {
                            scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select 
                                            name="week_day" 
                                            label="Dia da Semana" 
                                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                            value={scheduleItem.week_day}
                                            options={[
                                                { value: '0', label: 'Domingo' },
                                                { value: '1', label: 'Segunda-Feira' },
                                                { value: '2', label: 'Terça-Feira' },
                                                { value: '3', label: 'Quarta-Feira' },
                                                { value: '4', label: 'Quinta-Feira' },
                                                { value: '5', label: 'Sexta-Feira' },
                                                { value: '6', label: 'Sábado' }
                                        ]} />
                                        <Input 
                                            name="from" 
                                            label="Das" 
                                            type="time" 
                                            value={scheduleItem.from}
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        />
                                        <Input 
                                            name="to" 
                                            label="Até" 
                                            type="time" 
                                            value={scheduleItem.to}
                                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm