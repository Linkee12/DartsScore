type Asd<T, O extends { [Key in string]: string }> = {
    [Key in O[keyof O]]: T[keyof T]
}
type Jo<T,O  extends { [Key in string]:string}>=Pick<Asd<T,O>,O[keyof O]>


export default function table<T extends { [Key in keyof T]: string | number | boolean }, O extends { [Key in keyof T]: string }>(arr: T[], newKeys: Extract<O,any>): Jo<T,O>[] {
  return  arr.map((item) => {
        return Object.fromEntries(Object.entries(item).map(([k, v]) =>[(newKeys as any)[k] ?? k, v] ))
    }
    )
}

const users = [{ id: "asd", age: 12 }, { id: "alma", age: 12 }, { id: "körte", age: 12 ,}]

const renames={ id: "Id" as const, age: "Age" as const}
const ret=table(users, renames)
ret.map((e)=>console.log(e))
console.log(table(users, { id: "Id", age: "Age",asd:22}))
