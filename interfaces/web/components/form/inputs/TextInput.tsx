import { useLanguage } from "@pkg/contexts/LanguageContext";
import { capitalize } from "@pkg/utils/string";
import "@styles/components/form/input.scss"

export function TextInput({ 
  form, 
  name, 
  placeholder, 
  required,
  type = 'text',
  label,
  onChange,
}: { 
  form: any, 
  name: string, 
  placeholder: string, 
  required?: boolean,
  type?: string,
  label?: string,
  onChange: (...args: any[]) => any;
}) {
  const { t } = useLanguage();
  return (
      <div className={`input--${type}`}>
        <span>{label || capitalize(name)}</span>
        <input
          id={name}
          name={name}
          type={type}
          value={form.values[name]}
          onChange={ (e) => onChange(name, e.target.value) }
          placeholder={t(`${placeholder}`)}
          required={required}
        />
        {/* {formik.touched[name] && formik.errors[name] && (
          <div className="error-message">{formik.errors[name]}</div>
        )} */}
      </div>
  );
}