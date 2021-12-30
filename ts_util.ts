// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function become(obj: any, newClass: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj.__proto__ = (<any>(new newClass)).__proto__;
}