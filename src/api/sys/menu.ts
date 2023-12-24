import { defHttp } from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';
import { isEmpty, isNull, isUndefined } from 'xe-utils';

enum Api {
  GetMenuList = '/auth/menus',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList }).then((data) => {
    if (!isNull(data) && !isUndefined(data) && !isEmpty(data)) {
      updateTreeTitle(data);
    }

    return data;
  });
};

function updateTreeTitle(treeData) {
  treeData.forEach((element) => {
    element.meta = {
      title: element.title,
      icon: element.icon,
      hideMenu: element.hidden,
    };

    if (element.children) {
      updateTreeTitle(element.children);
    }
  });
}
