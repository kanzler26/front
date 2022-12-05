import {IFile} from "~/components/not-approved/ui/form-input-file.vue";

const createBlob = (file: IFile | any) => {
  try {
    const blob: Blob = new Blob([file],  {type: file.type});
    return URL.createObjectURL(blob)
  } catch (e) {
    return e
  }
}

export {
  createBlob
}
