import { FormGroup } from "@angular/forms"

export const markAllAsDirty = (form: FormGroup) => {
  form.markAllAsTouched();
  Object.keys(form.controls).forEach(controlName => {
    form.controls[controlName].markAsDirty();
  })
}