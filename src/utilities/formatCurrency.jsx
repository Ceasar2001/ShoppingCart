const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "PHP",
    style: "currency",
})

export function formatCurrency(number){
    return CURRENCY_FORMATTER.format(number)
}