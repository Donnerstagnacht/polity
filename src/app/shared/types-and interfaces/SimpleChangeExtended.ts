export type SimpleChangeExtended<keyOfObject extends string, T> = {
    [key in keyOfObject]: {
        previousValue: T,
        currentValue: T
        firstChange: boolean
        isFirstChange(): boolean
    }
}
