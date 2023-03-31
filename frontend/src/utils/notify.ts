export default function (type: string, message: string, timeout = null, group = null) {
  if (Array.isArray(message)) {
    message.map((value) => {
      this.$toast.add({
        group: group,
        severity: type,
        detail: value,
        life: timeout || (type === 'error' ? 10000 : 5000),
      });
    });
  } else {
    this.$toast.add({
      group: group,
      severity: type,
      detail: message,
      life: timeout || (type === 'error' ? 10000 : 5000),
    });
  }
}
