export type ApiErrorBody = {
  error: string;
};

/** Canonical success/error wrapper. Clinica HTTP still returns T or { error }. */
export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
