export class Delegate {
  static delegate: DelegateDeclaration = {}

  static delegateError(method: string, key: string, type: string) {
    console.warn(
      `Attempted to delegate ${method} to ${key} of ${type} but the method does not exist`,
    )
  }

  constructor() {
    const KType = Object.getPrototypeOf(this).constructor
    const declaration = KType.delegate as DelegateDeclaration

    Object.entries(declaration).forEach(([key, methods]) => {
      methods.forEach((method) => {
        KType.prototype[method] = (...args: unknown[]) => {
          const receiver = this[key as keyof typeof this]
          const call = receiver[method as keyof typeof receiver] as AnyFunction

          if (call) {
            return call.apply(receiver, args)
          }

          KType.delegateError(method, key, KType.name)
        }
      })
    })
  }
}
