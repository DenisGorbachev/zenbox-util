import { z, ZodObject } from 'zod'
import { isEqual, pick } from 'lodash-es'
import { GetUid } from './zod'
import { ZodRawShape } from 'zod'

// export function toUid<T>(obj: T, map: Record<keyof T, GetUid<T>>) {
//   return JSON.stringify()
// }

/**
 * An object of unknown form (possibly nested)
 */
export type Uid = unknown

export function toUid<T>(obj: T, ...keys: Array<keyof T>) {
  return pick(obj, ...keys)
}

export function toUidFromSchema<T extends ZodRawShape>(obj: z.infer<ZodObject<T>>, schema: ZodObject<T>) {
  return pick(obj, ...Object.keys(schema.shape))
}

// export function toUid<T>(array: Array<T>): string {
//   return JSON.stringify(array)
// }

export function fromUid<T>(uid: string): T {
  return JSON.parse(uid)
}

export function byUid<UidHolder, Obj extends UidHolder>(getUid: GetUid<UidHolder>, holder: UidHolder) {
  const uid = getUid(holder)
  // console.log('uid', uid)
  return function ($obj: Obj) {
    const $uid = getUid($obj)
    // console.log('$uid', $uid)
    return isEqual(uid, $uid)
  }
}

// export function getCompositeUid<O extends Record<string, unknown>>(object: O, map: Record<keyof O, GetUid<unknown>>) {
//   return JSON.stringify(Object.assign({}, object, { items: schedule.items.map(getScheduleItemUid) }))
// }
