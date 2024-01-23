export const weekDays = [ 
    { label: 'Poniedziałek', shortLabel: 'Pon' }, 
    { label: 'Wtorek', shortLabel: 'Wt' },
    { label: 'Środa', shortLabel: 'Śr' },
    { label: 'Czwartek', shortLabel: 'Czw' },
    { label: 'Piątek', shortLabel: 'Pt' },
    { label: 'Sobota', shortLabel: 'Sb' },
    { label: 'Niedziela', shortLabel: 'Nd' } 
]

export const months = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień',]



export const getDaysPrevMonth = (year, month) => {
    let firstDayOfWeekInMonth = new Date(year, month - 1, 1).getDay(); 
    firstDayOfWeekInMonth === 0 && (firstDayOfWeekInMonth = 7)
    let lastDayInPrevMonth = new Date(year, month-1, 0).getDate()
    let daysPrevMonth = []
    for(let i = lastDayInPrevMonth; i >= lastDayInPrevMonth - firstDayOfWeekInMonth+2; i--) {
        daysPrevMonth.push(i)
    }
    return daysPrevMonth.reverse()
}

export const getDaysInMonth = (year, month) => {
    const amountDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const days = amountDaysInMonth(year, month)
    const daysArray = []
    for (let i = 1; i <= days; i++) {
        daysArray.push(i)
    }
    return daysArray
}

export const getDaysNextMonth = (year, month) => {
    const lastDayOfWeekInMonth = new Date(year, month, 0).getDay()
    const daysArray = []
    if(lastDayOfWeekInMonth != 0) {
        for(let i = 1; i <= 7-lastDayOfWeekInMonth; i++) {
            daysArray.push(i)
        }
    }
    return daysArray
}