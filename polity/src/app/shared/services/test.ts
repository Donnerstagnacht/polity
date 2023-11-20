// // type NestedKeyOf<ObjectType extends object> =
// //     {
// //         [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
// //         ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
// //         : `${Key}`
// //     }[keyof ObjectType & (string | number)];
//
// type NestedKeyOf<ObjectType extends object> =
//     {
//         [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
//         ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
//         : `${Key}`
//     }[keyof ObjectType & (string | number)];
//
// type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
//     ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
//     : never
//
// class PersonClass2<T extends DatabaseModified> {
//     object: T | null = null;
//
//     constructor(input: T) {
//         this.object = input;
//     }
//
//     sortB(sortingAttribute: NestedKeyOf<T>): void {
//     }
// }
//
// const class2 = new PersonClass2(counters);
//
// class2.sortB('read')
//
// const class1 = new PersonClass2<Tables<'profiles_counters'>>();
//
// class1.sortB('f')
//
//
