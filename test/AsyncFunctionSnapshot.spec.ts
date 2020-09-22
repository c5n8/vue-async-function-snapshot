import vue from 'vue'
import compositionApi from '@vue/composition-api'
import { useAsyncFunctionSnapshot } from '~/src'

vue.use(compositionApi)

describe('AsyncFunctionSnapshot', () => {
  it('is standby before started', () => {
    const snapshot = useAsyncFunctionSnapshot(() => Promise.resolve())

    expect(snapshot.status).toBe('standby')
    expect(snapshot.isStandby).toBe(true)
    expect(snapshot.isPending).toBe(false)
    expect(snapshot.isSettled).toBe(false)
    expect(snapshot.isFulfilled).toBeUndefined()
    expect(snapshot.isRejected).toBeUndefined()
    expect(snapshot.hasResult).toBeUndefined()
    expect(snapshot.hasError).toBeUndefined()
    expect(snapshot.result).toBeUndefined()
    expect(snapshot.error).toBeUndefined()
  })

  it('is pending after started and before finished', () => {
    const snapshot = useAsyncFunctionSnapshot(() => Promise.resolve())
    snapshot.start()

    expect(snapshot.status).toBe('pending')
    expect(snapshot.isStandby).toBe(false)
    expect(snapshot.isPending).toBe(true)
    expect(snapshot.isSettled).toBe(false)
    expect(snapshot.isFulfilled).toBeUndefined()
    expect(snapshot.isRejected).toBeUndefined()
    expect(snapshot.hasResult).toBeUndefined()
    expect(snapshot.hasError).toBeUndefined()
    expect(snapshot.result).toBeUndefined()
    expect(snapshot.error).toBeUndefined()
  })

  it('is fulfilled after successfully finished: with result', async () => {
    const snapshot = useAsyncFunctionSnapshot(() => Promise.resolve(true))
    await snapshot.start()

    expect(snapshot.status).toBe('fulfilled')
    expect(snapshot.isStandby).toBe(false)
    expect(snapshot.isPending).toBe(false)
    expect(snapshot.isSettled).toBe(true)
    expect(snapshot.isFulfilled).toBe(true)
    expect(snapshot.isRejected).toBe(false)
    expect(snapshot.hasResult).toBe(true)
    expect(snapshot.hasError).toBe(false)
    expect(snapshot.result).toBeDefined()
    expect(snapshot.result).toBe(true)
    expect(snapshot.error).toBe(null)
  })

  it('is fulfilled after successfully finished: without result', async () => {
    const snapshot = useAsyncFunctionSnapshot(() => Promise.resolve())
    await snapshot.start()

    expect(snapshot.status).toBe('fulfilled')
    expect(snapshot.isStandby).toBe(false)
    expect(snapshot.isPending).toBe(false)
    expect(snapshot.isSettled).toBe(true)
    expect(snapshot.isFulfilled).toBe(true)
    expect(snapshot.isRejected).toBe(false)
    expect(snapshot.hasResult).toBe(false)
    expect(snapshot.hasError).toBe(false)
    expect(
      typeof snapshot.result === 'undefined' || snapshot.result === null
    ).toBe(true)
    expect(snapshot.error).toBe(null)
  })

  it('is rejected after failed to finish', async () => {
    const snapshot = useAsyncFunctionSnapshot(() =>
      Promise.reject(new Error('failed'))
    )

    try {
      await snapshot.start()
    } catch (error) {
      expect(snapshot.status).toBe('rejected')
      expect(snapshot.isStandby).toBe(false)
      expect(snapshot.isPending).toBe(false)
      expect(snapshot.isSettled).toBe(true)
      expect(snapshot.isFulfilled).toBe(false)
      expect(snapshot.isRejected).toBe(true)
      expect(snapshot.hasResult).toBe(false)
      expect(snapshot.hasError).toBe(true)
      expect(snapshot.result).toBeUndefined()
      expect(snapshot.error).toBeDefined()
    }
  })
})
