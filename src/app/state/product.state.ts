export enum DataStateEnum{
    LOADED,
    LOADING,
    ERROR
}
//appdata qui se peut s'appliquer à n'importe quel type,
//on le rend générique avec T
export interface AppDataState<T>{

    dataState?: DataStateEnum,
    data?:T,
    errorMessage?: string
}
//le ? indique que la présence dans lobjet n'est pas obligatoire