import Dep from './dep'
import observe from './observe'

export default function autoRun(cb) {
  // wraps a function call and sets itself
  // as the activeComputation to be collected
  // as a subscriber by any reactive dependencies
  // accessed by the function call.
  function wrappedCb() {
    Dep.activeComputation = wrappedCb
    cb()
    Dep.activeComputation = null
  }

  wrappedCb()

  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'test') return wrappedCb // necessary for testing
}
