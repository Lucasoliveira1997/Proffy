import { Request, Response } from 'express'
import convertHourToMinutes from '../utils/convertHourToMinutes'
import db from '../database/connection'

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index(req: Request, resp: Response) {
        const filters = req.query

        if (!filters.week_day || !filters.subject || !filters.time) {
            return resp.status(400).json({ error: 'Missing filters while to search classes' })
        }

        const weekDay = filters.week_day as string
        const subject = filters.subject as string
        const time = filters.time as string

        const timeInMinutes = convertHourToMinutes(time)

        try {
            const classes = await db('classes')
                .whereExists(function () {
                    this.select('class_schedule.*').from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(weekDay)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
    
                })
                .where('classes.subject', '=', subject)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*'])

                resp.status(200).json(classes)

        } catch (error) {       
            return resp.json({message: 'Error while acessing database for seach data', error})
        }

    }

    async create(req: Request, resp: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body

        const trx = await db.transaction()

        try {
            const idUserCreated = await trx('users').insert({ name, avatar, whatsapp, bio })
            const user_id = idUserCreated[0]

            const idClassCreated = await trx('classes').insert({ subject, cost, user_id })
            const class_id = idClassCreated[0]

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })

            await trx('class_schedule').insert(classSchedule)

            await trx.commit()

            resp.status(201).json({ message: 'Usuário criado com sucesso!' })

        } catch (error) {
            await trx.rollback()
            resp.status(400).json({ error: 'Unexpected error while creating a new class' })
        }

    }
}