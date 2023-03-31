export default function (name: string, base64: string) {
  const type = `@file/${name.split('.').pop()}`;
  const url = `data:${type};base64,${base64}`;

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const file = new File([blob], name, { type });
      const fileURL = window.URL.createObjectURL(file);
      const fileLink = document.createElement('a');

      fileLink.href = fileURL;
      fileLink.setAttribute('download', name);
      document.body.appendChild(fileLink);
      fileLink.click();
    });
}
