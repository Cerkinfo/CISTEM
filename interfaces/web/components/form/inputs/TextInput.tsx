import { useLanguage } from "@pkg/contexts/LanguageContext";

export function TextInput({ 
  formik, 
  name, 
  placeholder, 
  required,
}: { 
  formik: any, 
  name: string, 
  placeholder: string, 
  required?: boolean,
}) {
  const { t } = useLanguage();
  return (
      <div className="form-group">
        <input
          id={name}
          name={name}
          type="text"
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t(`${placeholder}`)}
          className="form-control"
          required={required}
        />
        {formik.touched[name] && formik.errors[name] && (
          <div className="error-message">{formik.errors[name]}</div>
        )}
      </div>
  );
}