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
    title: 'Method',
    dataIndex: 'method',
  },
  {
    title: 'Path',
    dataIndex: 'path',
  },
  {
    title: 'Group',
    dataIndex: 'group',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'method',
    label: 'Method',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'path',
    label: 'Path',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'group',
    label: 'Group',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'method',
    label: 'Method',
    required: true,
    component: 'Input',
  },
  {
    field: 'path',
    label: 'Path',
    required: true,
    component: 'Input',
  },
  {
    field: 'group',
    label: '分组',
    required: true,
    component: 'Input',
  },
  {
    field: 'description',
    label: '描述',
    required: false,
    component: 'Input',
  },
];
