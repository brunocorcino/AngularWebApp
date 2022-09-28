import { ActionReturn } from "./action-return";

export interface ApiResult<TData> {
    data: TData,
    status: ActionReturn;
}