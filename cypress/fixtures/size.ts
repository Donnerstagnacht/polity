// Mobile phone size: iphone 3 = @tui-mobile-min = 22.5em = 320px width
// Tablet size: ipad-2 = @tui-tablet-min = 48em = 768px width
// Desktop size: width, height [1024, 768] = @tui-desktop-min = 64em = 1024px width

export type Size = {
    width: number,
    height: number
}
export const Sizes: Size[] = [
    {
        width: 320,
        height: 480
    },
    {
        width: 768,
        height: 1024
    },
    {
        width: 1024,
        height: 768
    }
]
