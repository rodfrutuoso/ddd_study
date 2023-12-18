import { randomUUID } from "crypto"

export class UniqueEntityId{
    private value: string

    toString(){
        this.value
    }

    toValue(){
        this.value
    }

    constructor(value?:string){
        this.value = value ?? randomUUID()
    }
}