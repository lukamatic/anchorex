export const addDays = (date: Date, days:number):Date => {
    const d = new Date(date);
    return new Date(d.setDate(d.getDate() + days));
}

export const convertDateToStringForPicker = (date:Date|string|undefined):string|undefined => { 
    if(date === undefined)return date;
    try{
        var d = new Date(date as string),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
        return "" + [year, month, day].join('-');
    }catch(e){
        return date as string|undefined;
    }
}

export const convertStringToDateFromPicker = (date:string):Date => {
    return new Date(date);
}