import { updateAdminStatus } from '@/api/admin/admin';
import { getAllRoleList } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
// import { useMessage } from '@/hooks/web/useMessage';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

/**
 * transform mock data
 * {
 *  0: '华东分部',
 * '0-0': '华东分部-研发部'
 * '0-1': '华东分部-市场部',
 *  ...
 * }
 */
export const deptMap = (() => {
  const pDept = ['华东分部', '华南分部', '西北分部'];
  const cDept = ['研发部', '市场部', '商务部', '财务部'];

  return pDept.reduce((map, p, pIdx) => {
    map[pIdx] = p;

    cDept.forEach((c, cIndex) => (map[`${pIdx}-${cIndex}`] = `${p}-${c}`));

    return map;
  }, {});
})();

type CheckedType = boolean | string | number;
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 180,
  },
  {
    title: '手机',
    dataIndex: 'phone',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '正常',
        unCheckedChildren: '冻结',
        loading: record.pendingStatus,
        onChange(checked: CheckedType) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          // const { createMessage } = useMessage();
          updateAdminStatus(record.username, newStatus)
            .then(() => {
              record.status = newStatus;
              // createMessage.success(`已成功修改账户状态`);
            })
            .catch(() => {
              // createMessage.error('修改账户状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  // {
  //   title: '所属部门',
  //   dataIndex: 'dept',
  //   customRender: ({ value }) => {
  //     return deptMap[value];
  //   },
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'remark',
  // },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    // rules: [
    //   {
    //     required: true,
    //     message: '请输入用户名',
    //   },
    //   {
    //     trigger: 'blur',
    //     validator(_, value) {
    //       return new Promise((resolve, reject) => {
    //         if (!value) return resolve();
    //         isAccountExist(value)
    //           .then(resolve)
    //           .catch((err) => {
    //             reject(err.message || '验证失败');
    //           });
    //       });
    //     },
    //   },
    // ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: true,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  // {
  //   field: 'dept',
  //   label: '所属部门',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     fieldNames: {
  //       label: 'deptName',
  //       key: 'id',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  //   required: true,
  // },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '手机',
    field: 'phone',
    component: 'Input',
    required: false,
  },

  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '冻结', value: 0 },
        { label: '正常', value: 1 },
      ],
    },
  },
];
