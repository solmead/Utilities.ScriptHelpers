interface Array<T> {
    asQueryable(): Queryable<T>;
    remove(item: T): void;
}
interface IEnumerable<T> extends Array<T> {
}
interface IList<T> extends Array<T> {
}
interface List<T> extends Array<T> {
}
interface Dictionary<T1, T2> extends Object {
}
declare class Queryable<T> {
    private array?;
    constructor(array?: Array<any>);
    private equals;
    add: (item: T) => void;
    remove: (item: T) => void;
    push: (item: T) => void;
    toArray: () => T[];
    readonly length: number;
    readonly count: number;
    distinct: (compareFunction?: (obj1: T, obj2: T) => boolean) => Queryable<T>;
    where: (whereClause: (obj: T) => boolean) => Queryable<T>;
    any: (whereClause?: (obj: T) => boolean) => boolean;
    forEach: (func: (obj: T) => any) => boolean;
    sum: (func?: (obj: T) => number) => number;
    max: (func?: (obj: T) => number) => number;
    min: (func?: (obj: T) => number) => number;
    select: <T2>(selectItem: (obj: T) => T2) => Queryable<T2>;
    orderBy: (orderBy: (obj: T) => any, isDescending?: boolean) => Queryable<T>;
    orderByFunction: (orderBy?: (obj1: T, obj2: T) => number, isDescending?: boolean) => Queryable<T>;
    reverse: () => Queryable<T>;
    skip: (count: number) => Queryable<T>;
    take: (count: number) => Queryable<T>;
    first: () => T;
    last: () => T;
    findItem: (selectItem: (obj: T) => boolean) => T;
    find: (selectItem: (obj: T) => boolean) => T;
    contains: (item: T, compareFunction?: (obj1: T, obj2: T) => boolean) => boolean;
    union: (arr: Queryable<T> | T[]) => Queryable<T>;
    intersect: (arr: Queryable<T> | T[], compareFunction?: (obj1: T, obj2: T) => boolean) => Queryable<T>;
    difference: (arr: Queryable<T> | T[], compareFunction?: (obj1: T, obj2: T) => boolean) => Queryable<T>;
    copy: () => Queryable<T>;
    asQueryable: () => Queryable<T>;
}
