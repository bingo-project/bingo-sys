<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeDataMenu"
          :fieldNames="{ title: 'title', key: 'id' }"
          :expandedKeys="menuIDs"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
      <template #api="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeDataApi"
          :fieldNames="{ title: 'description', key: 'id' }"
          :expandedKeys="apiIDs"
          checkable
          toolbar
          title="API 分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';

  import {
    createRole,
    getPermissionApi,
    getPermissionMenu,
    setPermissionApi,
    setPermissionMenu,
    updateRole,
  } from '@/api/permission/role';
  import { menuList } from '@/api/permission/menu';
  import { allApi } from '@/api/permission/api';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const isPermission = ref(0);
  const treeDataMenu = ref<TreeItem[]>([]);
  const treeDataApi = ref<TreeItem[]>([]);
  const apiIDs = ref<number[]>([]);
  const menuIDs = ref<number[]>([]);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeDataMenu).length === 0) {
      treeDataMenu.value = (await menuList()) as any as TreeItem[];

      treeDataMenu.value.forEach((element) => {
        menuIDs.value.push(element.id);
      });
    }
    if (unref(treeDataApi).length === 0) {
      treeDataApi.value = (await allApi()) as any as TreeItem[];

      treeDataApi.value.forEach((element) => {
        apiIDs.value.push(element.id);
      });
    }
    isUpdate.value = !!data?.isUpdate;
    isPermission.value = data?.isPermission;

    // Get permission
    await getPermissions(data.record);

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
        isPermission: unref(isPermission),
      });
    }
  });

  const getTitle = computed(() =>
    unref(isPermission) == 1 ? '设置权限' : !unref(isUpdate) ? '新增角色' : '编辑角色',
  );

  // Get permissions
  async function getPermissions(record: Recordable) {
    await getPermissionMenu(record.name).then((data) => {
      record.menuIDs = data;
    });
    await getPermissionApi(record.name).then((data) => {
      record.apiIDs = data;
    });
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      // Set permission
      if (unref(isPermission) == 1) {
        // Set menu
        await setPermissionMenu(values.name, { menuIDs: values.menuIDs });

        // Set api
        await setPermissionApi(values.name, { apiIDs: values.apiIDs });
      } else {
        // Update or Create Role
        if (unref(isUpdate)) {
          await updateRole(values.name, values);
        } else {
          await createRole(values);
        }
      }

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
