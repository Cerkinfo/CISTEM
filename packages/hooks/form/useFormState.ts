import { useState } from "react";

export function useFormState<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set<K extends keyof T>(key: K, value: T[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function setError(field: string, code: string) {
    setErrors((e) => ({ ...e, [field]: code }));
  }

  function clearError(field: string) {
    setErrors((e) => {
      const { [field]: _, ...rest } = e;
      return rest;
    });
  }

  function resetErrors() {
    setErrors({});
  }

  return {
    values,
    set,

    errors,
    setError,
    clearError,
    resetErrors,

    reset: () => setValues(initial),
  };
}