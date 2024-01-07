<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './admin.data';
  import { CreateAdminRequest } from '@/api/model/admin/admin';
  import { createAdmin, updateAdmin } from '@/api/admin/admin';
  // import { getDeptList } from '@/api/demo/system';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.username;
      setFieldsValue({
        ...data.record,
      });
    }

    // 隐藏部门
    // const treeData = await getDeptList();
    // updateSchema([
    //   {
    //     field: 'pwd',
    //     show: !unref(isUpdate),
    //   },
    //   {
    //     field: 'dept',
    //     componentProps: { treeData },
    //   },
    // ]);
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      // Update or Create admin
      let params: CreateAdminRequest = {
        username: values.username,
        nickname: values.nickname,
        email: values.email,
        phone: values.phone,
        status: values.status,
        roleNames: values.roleNames,
      };

      if (values.password) {
        params.password = values.password;
      }

      if (unref(isUpdate)) {
        await updateAdmin(rowId.value, params);
      } else {
        await createAdmin(params);
      }

      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, username: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
./admin.data
