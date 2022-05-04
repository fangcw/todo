export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface MToDo {
  content: string;
  _id: string;
}

export interface IRes<T> {
  statusCode?: number;
  data?: T;
  errorCode?: number;
  msg?: string;
}
