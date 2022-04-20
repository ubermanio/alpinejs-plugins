import type { Alpine } from "alpinejs"

type InputValue = string | boolean | number | Date | null

type FormDataOptions = {
   json?: boolean
   validate?: "live" | "blur" | "submit"
   initialValues?: FormValues
}

type FormFieldValidatorFunction = (
   value: InputValue
) => [check: boolean, message: string][]

type FormTouched = Record<string, boolean>
type FormValues = Record<string, InputValue>
type FormErrors = Record<string, string[]>
type FormRules = Record<string, FormFieldValidatorFunction>

const parseValue = (val: any) => {
   try {
      return JSON.parse(val)
   } catch (error) {
      return val.toString()
   }
}

const FormPlugin = (Alpine: Alpine) => {
   Alpine.data("form", () => (url: string, options: FormDataOptions = {}) => ({
      init() {
         console.log({ url, options })
      },
      url,

      _touched: {} as FormTouched,
      _values: options?.initialValues || ({} as FormValues),
      _errors: {} as FormErrors,
      _rules: {} as FormRules,

      _validate(submitted = false) {
         Object.keys(this._errors).forEach((field) => {
            this._errors[field] = []
         })
         console.log("validating")

         Object.keys(this._rules).forEach((field) => {
            if (!submitted) {
               if (!this._touched[field]) return
            }
            const validatorFunction = this._rules[field]
            const value = this._values[field]
            const results = validatorFunction(value)
            results.forEach(([check, message]) => {
               console.log({ field, check, message })
               if (!check) this._errors[field].push(message)
            })
         })
      },

      field(name: string, validators: FormFieldValidatorFunction = () => []) {
         this._touched[name] = false
         this._values[name] ??= ""
         this._rules[name] ??= validators
         this._errors[name] = []

         return {
            ["@change"]: (e: Event) => {
               this._values[name] = parseValue(
                  (e.target as HTMLInputElement)?.value
               )
            },
            ["@input"]: (e: Event) => {
               this._values[name] = parseValue(
                  (e.target as HTMLInputElement)?.value
               )
               this._validate()
            },
            ["@focus"]: () => {
               if (!this._touched[name]) this._touched[name] = true
            },
            [":value"]: () => {
               return this._values[name]
            },
         }
      },
   }))
}

export default FormPlugin
