import {expect, test} from 'vitest'
import { OpenShift } from './open-shift'

test('open a shift', ()=>{
    const openShift = new OpenShift()

    const shift = openShift.execute({teamId: '1',date: new Date('2023-12-15 00:00:00')})

    expect(shift.teamId).toEqual('1')
    expect(shift.date).toEqual(new Date('2023-12-15 00:00:00'))
})