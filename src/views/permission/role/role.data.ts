import { BasicColumn, FormSchema } from '@/components/Table';

// import { h } from 'vue';
// import { Switch } from 'ant-design-vue';
// import { setRoleStatus } from '@/api/demo/system';
// import { useMessage } from '@/hooks/web/useMessage';

// type CheckedType = boolean | string | number;
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.status === '1',
  //       checkedChildren: '停用',
  //       unCheckedChildren: '启用',
  //       loading: record.pendingStatus,
  //       onChange(checked: CheckedType) {
  //         record.pendingStatus = true;
  //         const newStatus = checked ? '1' : '0';
  //         const { createMessage } = useMessage();
  //         setRoleStatus(record.id, newStatus)
  //           .then(() => {
  //             record.status = newStatus;
  //             createMessage.success(`已成功修改角色状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改角色状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    // width: 180,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'isPermission',
    label: '设置权限',
    component: 'Input',
    dynamicDisabled: true,
    show: false,
  },
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    dynamicDisabled: true,
    show: false,
  },
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => !!values.id,
    ifShow: ({ values }) => !values.isPermission,
  },
  {
    field: 'description',
    label: '角色描述',
    required: true,
    component: 'Input',
    ifShow: ({ values }) => !values.isPermission,
  },
  {
    field: 'remark',
    label: '备注',
    required: false,
    component: 'Input',
    ifShow: ({ values }) => !values.isPermission,
  },
  {
    label: ' ',
    field: 'menuIDs',
    slot: 'menu',
    component: 'ApiTree',
    ifShow: ({ values }) => !!values.isPermission,
  },
  {
    label: ' ',
    field: 'apiIDs',
    slot: 'api',
    component: 'ApiTree',
    ifShow: ({ values }) => !!values.isPermission,
  },
];
