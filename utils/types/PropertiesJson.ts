interface ValueKey{
    Name:string
}

interface PropertiesJson{
    Key:string,
    Name:string,
    Only:boolean,
    Value:ValueKey[]
}

interface PropertiesItemJson{
    Name:string,
    Value?:string
}