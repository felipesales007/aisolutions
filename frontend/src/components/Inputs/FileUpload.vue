<template>
  <div class="input-file-upload" :class="columns">
    <!-- título -->
    <span
      v-if="object.label || $slots['label-left'] || $slots['slot-right']"
      class="flex align-items-center mb-1">
      <slot v-if="$slots['label-left']" name="label-left" />

      <label
        v-if="object.label"
        :for="name || ariaId"
        :class="[
          labelClass,
          { 'p-error': checkValidate },
          { 'text-primary p-disabled': !config && !label && !!name },
        ]"
        @click="($refs.choose as any).$el.click()">
        {{ object.label }}
        <span v-if="object.required" class="p-error">*</span>
      </label>

      <slot v-if="$slots['label-right']" name="label-right" />
    </span>

    <!-- campo -->
    <div class="flex align-items-center">
      <slot v-if="$slots['slot-left']" name="slot-left" />

      <div
        :class="[
          'w-full',
          bodyClass,
          { 'p-invalid': checkValidate },
          { 'fe-label-on': !object.label && labelOn },
        ]">
        <FileUpload
          :id="name || ariaId"
          :disabled="disabled || limit"
          :class="inputClass"
          :multiple="multiple"
          :accept="accept"
          :file-limit="fileLimit"
          :max-file-size="maxFileSize"
          :preview-width="previewWidth"
          @select="select">
          <!-- topo -->
          <template #header="{ chooseCallback }">
            <div
              class="flex flex-wrap align-items-center flex-1 gap-2"
              :class="[
                { 'justify-content-between': !(limit || (!multiple && !!listFiles.length)) },
                { 'justify-content-end': limit || (!multiple && !!listFiles.length) },
              ]">
              <Button
                v-if="!(limit || (!multiple && !!listFiles.length))"
                ref="choose"
                icon="pi pi-plus"
                :label="term.add"
                :disabled="disabled"
                @click="chooseCallback()" />

              <div v-if="base64.length" class="text-sm text-color-secondary">
                {{ base64.length }}
                {{ term.file }}{{ base64.length > 1 ? 's' : '' }}
              </div>
            </div>
          </template>

          <!-- lista -->
          <template #body>
            <!-- mensagens de erros -->
            <Message
              v-for="(item, index) of (alerts as any)"
              :key="index"
              :life="timeout"
              :sticky="false"
              :closable="false"
              severity="info">
              <div class="flex align-items-center justify-content-between">
                <div>{{ item }}</div>

                <Button
                  icon="pi pi-times"
                  class="p-message-close p-link"
                  @click="closeMessage(index)" />
              </div>
            </Message>

            <!-- items -->
            <template v-if="base64.length">
              <!-- lista -->
              <div
                v-for="(file, index) of (listFiles as any)"
                :key="index"
                class="p-fileupload-file uploaded">
                <!-- imagem -->
                <img
                  v-if="file.base64 && file.contentType.includes('image')"
                  :src="`data:${file.contentType};base64,${file.base64}`"
                  :width="previewWidth"
                  alt="" />

                <!-- nome e tamanho -->
                <div>
                  <div class="p-fileupload-file-name">
                    {{ file.name }}
                  </div>

                  {{ formatSize(file.size) }}
                </div>

                <!-- ações -->
                <div class="p-fileupload-file-actions">
                  <!-- arquivo local -->
                  <Button
                    v-if="!file[listId]"
                    v-tooltip.top="term.download"
                    icon="pi pi-download"
                    class="p-button-text p-button-rounded"
                    @click="$download(file.name, file.base64)" />

                  <!-- arquivo externo -->
                  <Button
                    v-if="file[listId]"
                    v-tooltip.top="term.download"
                    icon="pi pi-download"
                    class="p-button-text p-button-rounded"
                    :class="`loading-${index}-${file[listId]}`"
                    @click="$emit('download', file[listId], `loading-${index}-${file[listId]}`)" />

                  <!-- remover arquivo -->
                  <Button
                    v-tooltip.top="term.remove"
                    icon="pi pi-times"
                    class="p-button-text p-button-danger p-button-rounded ml-2"
                    @click="toRemove(index)" />
                </div>
              </div>
            </template>
          </template>

          <!-- sem dados -->
          <template v-if="!base64.length" #empty>
            <div
              :class="{ 'opacity-30': disabled }"
              class="flex align-items-center justify-content-center flex-column">
              <!-- ícone e texto sem dados -->
              <i
                v-if="placeholderIcon"
                class="pi pi-cloud-upload text-2xl text-600 border-600 border-2 border-circle p-2 mb-3" />
              <div class="text-600 text-center">
                {{
                  noPlaceholder || object.placeholder !== ''
                    ? object.placeholder
                    : 'Arraste e solte os arquivos aqui para fazer o upload'
                }}
              </div>
            </div>
          </template>
        </FileUpload>
      </div>

      <slot v-if="$slots['slot-right']" name="slot-right" />
    </div>

    <!-- alerta -->
    <div v-if="checkValidate && invalid?.required?.$invalid" class="text-xs p-error mt-1">
      {{ object.messageRequired ? object.messageRequired : pMessageRequired(object.label) }}
    </div>

    <!-- informações -->
    <div v-if="object.info" class="mt-1">
      <div class="text-xs text-gray-600" v-html="object.info" />
    </div>

    <div v-if="$slots['slot-bottom']" class="mt-1">
      <slot name="slot-bottom" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Base64 } from '@/models/Global';
import { UniqueComponentId } from 'primevue/utils';
import validate from '@/components/Functions/Validation/Validate.vue';
import validateFileUpload from '@/components/Functions/Validation/ValidateFileUpload.vue';
import FileUpload from '@/global/primevue/fileupload/FileUpload.vue';

export default defineComponent({
  name: 'PFileUpload',
  components: { FileUpload },
  mixins: [validate, validateFileUpload],
  props: {
    col: {
      type: Array,
      default: () => [12, 12, 12, 12, 12],
      description:
        'Tamanho da coluna [telefones, telefones, tablets, notebooks, monitores] entre (1 à 12)',
    },
    label: {
      type: String,
      default: '',
      description: 'Título',
    },
    labelOn: {
      type: Boolean,
      default: false,
      description: 'Margem no topo para alinhamento do campo sem label',
    },
    labelClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas',
    },
    bodyClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas',
    },
    inputClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas',
    },
    name: {
      type: String,
      default: '',
      description: 'Nome do campo',
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'Campo desabilitado',
    },
    required: {
      type: Boolean,
      default: false,
      description: 'Campo requerido',
    },
    placeholder: {
      type: String,
      default: 'Arraste e solte os arquivos aqui para fazer o upload',
      description: 'Texto do campo sem dado',
    },
    placeholderIcon: {
      type: Boolean,
      default: false,
      description: 'Ícone do campo sem dado',
    },
    noPlaceholder: {
      type: Boolean,
      default: false,
      description: 'Remoção de texto do campo sem dado',
    },
    multiple: {
      type: Boolean,
      default: false,
      description: 'Múltiplos arquivos',
    },
    accept: {
      type: String,
      default: '',
      description: 'Tipos de arquivos a serem aceitos',
    },
    fileLimit: {
      type: Number,
      default: 0,
      description: 'Quantidade máxima de arquivos',
    },
    maxFileSize: {
      type: Number,
      default: 0,
      description: 'Tamanho máximo dos arquivos em bytes',
    },
    previewWidth: {
      type: Number,
      default: 30,
      description: 'Tamanho das imagens em preview da listagem',
    },
    invalidFileSizeMessage: {
      type: String,
      default: 'O tamanho do arquivo {0} deve ser menor que {1}.',
      description: 'Mensagem de tamanho não permitido',
    },
    invalidFileLimitMessage: {
      type: String,
      default: 'Quantidade máxima de arquivos excedido, o limite é {0} no máximo.',
      description: 'Mensagem de limite máximo de arquivos',
    },
    invalidFileTypeMessage: {
      type: String,
      default: 'O tipo do arquivo {0} é inválido, os tipos de arquivo permitidos: {1}.',
      description: 'Mensagem de tipo de arquivo inválido',
    },
    invalidFileExistMessage: {
      type: String,
      default: 'O arquivo {0} já esta anexado',
      description: 'Mensagem de arquivo já existente.',
    },
    info: {
      type: String,
      default: '',
      description: 'Informações',
    },
    validateBlur: {
      type: Boolean,
      default: false,
      description: 'Verifica a validação do campo ao desforcar',
    },
    config: {
      type: Object,
      default: null,
      description: 'Configurações do campo',
    },
    invalid: {
      type: Object,
      default: null,
      description: 'Validação do campo',
    },
    submit: {
      type: Boolean,
      default: false,
      description: 'Validação ao enviar o formulário',
    },
    messageRequired: {
      type: String,
      default: '',
      description: 'Mensagem de válidação de obrigatório personalizado',
    },
    listId: {
      type: String,
      default: 'id',
      description: 'ID dos arquivos',
    },
    listFiles: {
      type: Array,
      default: () => [],
      description: 'Lista de arquvivos salvos ou pendentes de envio',
    },
  },
  emits: ['base64', 'files', 'remove', 'download'],
  data() {
    return {
      object: {
        label: this.config ? this.config.label : this.showLabel(),
        placeholder: this.config ? this.config.placeholder : this.placeholder,
        required: this.config ? this.config.required : this.required,
        messageRequired: this.config ? this.config.messageRequired : this.messageRequired,
        minlength: this.config ? this.config.minlength : this.$attrs.minlength,
        maxlength: this.config ? this.config.maxlength : this.$attrs.maxlength,
        info: this.config ? this.config.info : this.info,
      },
      blur: false,
      created: true,
      limit: false,
      base64: [] as Base64[],
      files: [] as File[],
      remove: [] as number[],
      term: {
        add: 'Adicionar',
        file: 'arquivo',
        download: 'Baixar',
        remove: 'Remover',
      },
    };
  },
  computed: {
    ariaId() {
      if (this.config?.name) return this.config.name;
      return UniqueComponentId();
    },
    columns() {
      const col = [] as any;

      this.col.forEach((item: number, index: number) => {
        if (index === 0) col.push(`col-${item}`);
        if (index === 1) col.push(`sm:col-${item}`);
        if (index === 2) col.push(`md:col-${item}`);
        if (index === 3) col.push(`lg:col-${item}`);
        if (index === 4) col.push(`xl:col-${item}`);
      });

      return col.join(' ');
    },
    checkValidate() {
      return (this.invalid?.$invalid && this.submitted) || (this.invalid?.$invalid && this.blur);
    },
  },
  watch: {
    submitted(value: boolean) {
      this.blur = false;

      if (!value) {
        this.limit = false;
        this.base64 = [];
        this.files = [];
        this.messages = [];
        this.$emit('base64', [], this.name);
        this.$emit('files', [], this.name);
        this.clear();
      }
    },
    submit(value: boolean) {
      this.blur = value;
    },
    listFiles(value: Base64[]) {
      if (value && value.length && this.created) {
        this.base64 = value;
        this.toFile(value);
      }

      this.created = false;
    },
  },
  created() {
    this.base64 = this.listFiles;
    this.toFile(this.listFiles);
    this.limit = this.checkFileLimit();
  },
  methods: {
    showLabel() {
      return !!this.label || !this.name ? this.label : this.name;
    },
    select(event: any) {
      let count = 0;
      this.messages = [];
      this.created = false;

      // obtém os arquivos para formatação
      const files = event.files.filter((item: any) => {
        if (!this.limit && !this.exist(item) && this.validate(item)) {
          count++;
          // verifica o limite de arquivos
          this.limit = this.checkFileLimit(true, count);
          return item;
        }
      });

      // formata para base64
      files.filter((item: any) => {
        this.toBase64(item);
      });

      this.$emit('base64', this.base64, this.name);
      this.$emit('files', this.files, this.name);
      if (!files.length) this.verify();
    },
    toBase64(item: any) {
      // arquivos
      this.files.push(item);

      // arquivos para base64
      const base64 = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

      // armazenamento dos arquvios em base64
      base64.then((base: any) => {
        const format = base.replace(`data:${item.type};base64,`, '');

        this.base64.push({
          name: item.name,
          size: item.size,
          contentType: item.type,
          base64: format,
        });

        this.verify();
      });
    },
    toFile(list: Base64[]) {
      list.forEach((item: Base64) => {
        if (item.name && item.base64) {
          const type = `@file/${item.name.split('.').pop()}`;
          const url = `data:${type};base64,${item.base64}`;

          fetch(url)
            .then((response) => response.blob())
            .then((blob) => this.files.push(new File([blob], item.name, { type })));

          this.$emit('files', this.files, this.name);
        }
      });
    },
    toRemove(index: number) {
      const id = this.base64[index]?.[this.listId];
      if (id) this.remove.push(Number(id));

      this.created = false;
      this.base64.splice(index, 1);
      this.files.splice(index, 1);
      this.$emit('base64', this.base64, this.name);
      this.$emit('files', this.files, this.name);
      this.$emit('remove', this.remove, this.name);
      this.messages = [];
      this.verify();
    },
    verify() {
      this.limit = this.checkFileLimit();
      if (this.validateBlur) this.blur = true;
      this.clear();
    },
    clear() {
      this.$nextTick(() => {
        const list = this.$el.querySelectorAll('.p-fileupload-file:not(.uploaded) button');
        const array = Array.from(list);
        array.forEach((item: any) => item.click());
      });

      setTimeout(() => {
        const list = this.$el.querySelectorAll('.p-fileupload-file:not(.uploaded) button');
        const array = Array.from(list);
        array.forEach((item: any) => item.click());
      }, 1000);
    },
  },
});
</script>

<style>
.input-file-upload .p-invalid .p-fileupload-buttonbar,
.input-file-upload .p-invalid .p-fileupload-content {
  border: 1px solid #dc3545;
}

.dark .input-file-upload .p-invalid .p-fileupload-buttonbar,
.dark .input-file-upload .p-invalid .p-fileupload-content {
  border: 1px solid #f19ea6;
}

.input-file-upload .p-invalid .p-fileupload-buttonbar,
.dark .input-file-upload .p-invalid .p-fileupload-buttonbar {
  border-bottom: none;
}

.input-file-upload .p-fileupload .p-fileupload-buttonbar,
.input-file-upload .p-fileupload .p-fileupload-content,
.input-file-upload .p-fileupload-content {
  padding: 1rem;
}

.input-file-upload .p-fileupload-buttonbar {
  height: 69px;
}

.input-file-upload .p-fileupload-content {
  min-height: 112px;
}

.input-file-upload .p-message-close {
  border-color: transparent !important;
}

.input-file-upload .p-message-close:active {
  background: transparent !important;
}

.input-file-upload .p-badge,
.input-file-upload .p-progressbar,
.input-file-upload .p-fileupload-file img:not([src]),
.input-file-upload .p-fileupload-file:not(.uploaded) {
  display: none;
}
</style>
