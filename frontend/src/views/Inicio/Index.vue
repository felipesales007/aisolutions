<template>
  <p-header :title="term.title" />

  <!-- formulário -->
  <form novalidate @submit.prevent="save(!v$.form.$invalid)">
    <p-card border shadow :blocked="blocked" :loading="loading">
      <div v-if="!loading" class="grid">
        <!-- importação -->
        <div class="col-12">
          <FileUpload
            v-if="importShow"
            v-model="importMetadata"
            mode="basic"
            upload-icon="pi pi-download"
            :choose-label="term.import"
            :max-file-size="1000000"
            class="fe-float-r"
            @select="importDocuments" />
        </div>

        <Divider align="left" class="mx-2">
          <div class="inline-flex align-items-center text-gray-600">
            <i class="pi pi-file mr-2" />
            <div>{{ term.files }}</div>
          </div>
        </Divider>

        <!-- documents -->
        <p-file-upload
          v-model="v$.form.metadata.$model"
          label-on
          placeholder-icon
          validate-blur
          multiple
          name="metadata"
          list-id="id"
          :label="term.files"
          required
          :max-file-size="1000000"
          :list-files="form.metadata"
          :invalid="v$.form.metadata"
          :info="term.info"
          @base64="base64"
          @remove="changeMetadataRemove"
          @download="download" />
      </div>

      <!-- botões -->
      <template v-if="!loading" #footer>
        <div class="flex justify-content-end">
          <Button
            :label="blocked ? term.saving : term.save"
            :disabled="v$.form.$invalid"
            :loading="blocked"
            icon="pi pi-check"
            type="submit" />
        </div>
      </template>
    </p-card>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Base64 } from '@/models/Global';
import validate from '@/components/Functions/Validation/Validate.vue';
import buttonLoading from '@/components/Functions/Global/ButtonLoading.vue';
import { required } from '@vuelidate/validators';

export default defineComponent({
  mixins: [validate, buttonLoading],
  data() {
    return {
      loading: true,
      blocked: false,
      importShow: true,
      term: {
        title: 'Início',
        files: 'Docuemntos',
        import: 'Importar',
        save: 'Salvar',
        saving: 'Salvando',
        info: 'Realize o envio, download ou remoção dos documentos desejados.',
      },
      importMetadata: null,
      form: {
        metadata: [] as Base64[],
        remove: [] as number[],
      },
    };
  },
  validations() {
    const form = {
      metadata: {
        required,
      },
    };

    return { form };
  },
  created() {
    this.get();
  },
  methods: {
    importDocuments(event: any) {
      const reader = new FileReader() as any;
      const file = event.files[0];
      const type = file.name.split('.')[1];
      reader.readAsText(file);

      reader.onload = () => {
        if (type === 'json') {
          const data = JSON.parse(reader.result);

          if (data.documentos) {
            data.documentos.forEach((item: Base64) => {
              this.form.metadata.push(item);
            });
          } else {
            this.$notify('warn', 'Arquivo fora do padrão esperado.');
          }

          this.importShow = false;
          this.$nextTick(() => (this.importShow = true));
        } else {
          this.importShow = false;
          this.$nextTick(() => (this.importShow = true));
          this.$notify(
            'warn',
            'A importação só aceita arquivos no formato .json e dentro do padrão estabelecido.',
          );
        }
      };
    },
    base64(data: Base64[]) {
      this.form.metadata = data;
    },
    download(id: number | string, item: string) {
      this.buttonLoading(item);
      this.$axios(`${this.$url.documents.download}/${id}`)
        .then((response: any) => {
          const file = response.data.dados;
          this.$download(file.name, file.base64);
          this.buttonUnloading(item);
        })
        .catch((e: any) => {
          this.$notify('error', e.response?.data || e);
          this.buttonUnloading(item);
        });
    },
    reset() {
      this.form.remove = [] as number[];
      this.blocked = false;
    },
    changeMetadataRemove(data: number[]) {
      this.form.remove = data;
    },
    save(valid: boolean) {
      if (this.enter) return;
      this.submitted = true;
      if (!valid) return;
      this.blocked = true;

      this.$axios
        .post(this.$url.documents.index, this.form)
        .then(() => {
          this.reset();
          this.$notify('success', 'Envio realizado com sucesso.');
        })
        .catch((e: any) => {
          this.blocked = false;
          this.$error(e);
        });
    },
    get() {
      this.loading = true;

      this.$axios(this.$url.documents.index)
        .then((response: any) => {
          this.form = response.data.dados;
          this.loading = false;
        })
        .catch((e: any) => {
          this.loading = false;
          this.$notify('error', e.response?.data || e);
        });
    },
  },
});
</script>
