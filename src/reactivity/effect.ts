const targetMap = new Map()
export function track (target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)
  for (let _effect of dep) {
    _effect()
  }
}

class ReactiveEffect {
  private _fn: any

  constructor(fn) {
    this._fn = fn
  }

  run() {
    activeEffect = this._fn
    this._fn()
  }
}

let activeEffect
export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}