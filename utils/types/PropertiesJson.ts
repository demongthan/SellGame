interface ValueKey{
    Name:string,
    ValueMax?:number,
    ValueMin?:number,
    Value?:string
}

interface PropertiesJson{
    Key:string,
    Name:string
    Value:ValueKey[]
}