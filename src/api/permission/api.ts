import { defHttp } from '@/utils/http/axios';
import { ApiAllResult, ApiListResult, ApiParams, CreateApiRequest } from '../model/permission/api';

enum Api {
  ApiList = '/apis',
  ApiAll = '/apis/all',
  ApiTree = '/apis/tree',
}

export const listApi = (params?: ApiParams) =>
  defHttp.get<ApiListResult>({ url: Api.ApiList, params });

export const createApi = (params?: CreateApiRequest) =>
  defHttp.post({ url: Api.ApiList, params: params });

export const updateApi = (id: number, params?: CreateApiRequest) =>
  defHttp.put({ url: Api.ApiList + '/' + id, params: params });

export const deleteApi = (id: number) => defHttp.delete({ url: Api.ApiList + '/' + id });

export const allApi = (params?: ApiParams) =>
  defHttp.get<ApiAllResult>({ url: Api.ApiAll, params }).then((data) => {
    data.forEach((element) => {
      if (element.description == '') {
        element.description = element.method + ': ' + element.path;
      }
    });

    return data;
  });

export const apiTree = (params?: ApiParams) =>
  defHttp.get<ApiAllResult>({ url: Api.ApiTree, params }).then((data) => {
    updateTreeTitleApi(data);

    console.log('apiTree', data);

    return data;
  });

function updateTreeTitleApi(treeData) {
  treeData.forEach((element, index) => {
    if (element.description == undefined) {
      element.id = -index;
      element.description = element.key;
    }

    if (element.description == '') {
      element.description = element.method + ': ' + element.path;
    }

    if (element.children) {
      updateTreeTitleApi(element.children);
    }
  });
}
