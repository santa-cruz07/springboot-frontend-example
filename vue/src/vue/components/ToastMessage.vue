<template>
  <Toast :position="toastPosition" />
</template>

<script>
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { emitter } from '@/main';

export default {
  props: ['position'],
  components: {
    Toast
  },
  setup(props) {
    const toast = useToast();
    const toastPosition = props.position || 'top-right';

    const defaultErrorToastConfig = {
      severity: 'error',
      life: 5000
    };

    const defaultSuccessToastConfig = {
      severity: 'success',
      life: 5000
    };

    const defaultInfoToastConfig = {
      severity: 'info',
      life: 5000
    };

    emitter.on('toast-error', toastConfig => {
      toast.add({ ...defaultErrorToastConfig, ...toastConfig });
    });

    emitter.on('toast-success', toastConfig => {
      toast.add({ ...defaultSuccessToastConfig, ...toastConfig });
    });

    emitter.on('toast-info', toastConfig => {
      toast.add({ ...defaultInfoToastConfig, ...toastConfig });
    });

    return {
      toastPosition
    }
  }
}
</script>

<style>
.p-toast.p-component.p-toast-top-right.p-ripple-disabled {
  z-index: 9999;
}
</style>