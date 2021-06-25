export const trimText = (text, count) => {
    return text.slice(0, count) + (text.length > count ? '...' : '');
};
export const cartQuantity = (cart) => {
    if (cart.length === 0) return 0;
    let total = 0;
    cart.map((cartItem) => {
        return total += cartItem.quantity;
    })
    return total;
}