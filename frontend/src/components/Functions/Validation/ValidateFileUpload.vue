<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PValidateFileUpload',
  data() {
    return {
      messages: [],
      alerts: [],
      time: 0,
      timeout: 10000,
    };
  },
  watch: {
    messages(value: []) {
      const list = value.filter((item: never, index: number) => {
        return value.indexOf(item) === index;
      });

      this.alerts = list;

      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.alerts = [];
      }, this.timeout + 500);
    },
  },
  methods: {
    closeMessage(index: number) {
      this.alerts.splice(index, 1);
    },
    validate(file: any) {
      // verifica se o formato do aquivo é permitido
      if (this.accept && !this.isFileTypeValid(file)) {
        this.messages.push(
          this.invalidFileTypeMessage.replace('{0}', file.name).replace('{1}', this.accept),
        );

        return false;
      }

      // verifica se o tamanho do aquivo é permitido
      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.messages.push(
          this.invalidFileSizeMessage
            .replace('{0}', file.name)
            .replace('{1}', this.formatSize(this.maxFileSize)),
        );

        return false;
      }

      return true;
    },
    exist(item: any) {
      // verifica se o arquivo já existe
      const exist = this.base64.some((newer: any) => newer.name === item.name);

      if (exist) {
        this.messages.push(this.invalidFileExistMessage.replace('{0}', item.name));

        return true;
      }

      return false;
    },
    isFileTypeValid(file: any) {
      const acceptableTypes = this.accept.split(',').map((type: any) => type.trim());

      for (const type of acceptableTypes) {
        const acceptable = this.isWildcard(type)
          ? this.getTypeClass(file.type) === this.getTypeClass(type)
          : file.type === type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

        if (acceptable) {
          return true;
        }
      }

      return false;
    },
    isWildcard(fileType: any) {
      return fileType.indexOf('*') !== -1;
    },
    getTypeClass(fileType: any) {
      return fileType.substring(0, fileType.indexOf('/'));
    },
    getFileExtension(file: any) {
      return '.' + file.name.split('.').pop();
    },
    checkFileLimit(message = false, item = 0) {
      // verifica a quantidade de aquivo permitido
      if (this.base64.length + item >= this.fileLimit && this.fileLimit) {
        if (message) {
          this.messages.push(this.invalidFileLimitMessage.replace('{0}', String(this.fileLimit)));
        }

        return true;
      }

      return false;
    },
    formatSize(bytes: number) {
      if (bytes === 0) return '0 B';

      const k = 1000,
        dm = 3,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
  },
});
</script>
