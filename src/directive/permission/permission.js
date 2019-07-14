import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const {value} = binding
    const powers = store.getters.powers
    const hasPermission = powers.some(power => value === power)
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
