<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:setting-outlined',
                tooltip: '设置权限',
                onClick: handleSetPermission.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                tooltip: '删除',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteRole, listRole } from '@/api/permission/role';

  import { useDrawer } from '@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  import { columns, searchFormSchema } from './role.data';

  defineOptions({ name: 'RoleManagement' });

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: listRole,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
      isPermission: false,
    });
  }

  function handleEdit(record: Recordable) {
    console.log('handle permission');
    openDrawer(true, {
      record,
      isUpdate: true,
      isPermission: false,
    });
  }

  function handleDelete(record: Recordable) {
    deleteRole(record.name).then(() => handleSuccess());
  }

  function handleSuccess() {
    reload();
  }

  function handleSetPermission(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
      isPermission: true,
    });
  }
</script>
