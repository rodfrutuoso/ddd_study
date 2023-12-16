import {expect, test} from 'vitest'
import { OpenShift } from './open-shift'
import { ShitRepository } from '../repositories/shift-repository'
import { Shift } from '../entities/shift'

const fakeShiftRepository: ShitRepository = {
    create: async (shift: Shift): Promise<void> => {
        return
    }
}

test('open a shift', async ()=>{
    const openShift = new OpenShift(fakeShiftRepository)

    const shift = await openShift.execute({teamId: '1',date: new Date('2023-12-15 00:00:00')})

    expect(shift.teamId).toEqual('1')
    expect(shift.date).toEqual(new Date('2023-12-15 00:00:00'))
})