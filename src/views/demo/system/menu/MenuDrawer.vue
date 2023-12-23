<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { createMenu, getMenuList, updateMenu } from '@/api/demo/system';
  import { CreateMenuRequest } from '@/api/demo/model/systemModel';

  defineOptions({ name: 'MenuDrawer' });

  const emit = defineEmits(['success', 'register']);

  let id = ref(0);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      id.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getMenuList();

    // update treeData
    updateTreeTitle(treeData);

    updateSchema({
      field: 'parentID',
      componentProps: { treeData },
    });
  });

  async function updateTreeTitle(treeData) {
    treeData.forEach((element) => {
      element.title = element.meta.title;
      if (element.children) {
        updateTreeTitle(element.children);
      }
    });
  }

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      // Create menu api
      let params: CreateMenuRequest = {
        name: values.name,
        path: values.path,
        sort: Number(values.sort),
        component: values.component,
        redirect: values.redirect,
        parentID: values.parentID,
        title: values.meta.title,
        icon: values.meta.icon,
        hidden: values.meta.hideMenu ? '1' : '0',
      };

      // Update or Create menu
      if (unref(isUpdate)) {
        await updateMenu(id.value, params);
      } else {
        await createMenu(params);
      }

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
