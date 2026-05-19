const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^[0-9]{10}$/;

const MAX_NAME_LENGTH = 100;
const MAX_NOTES_LENGTH = 500;
const MAX_ADDRESS_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 1000;

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  program: string;
  address: string;
  notes?: string;
};

export type PaymentPayload = {
  userId: string;
  transactionId: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ValidationResult<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function safeTrim(value: unknown): string {
  return isString(value) ? value.trim() : "";
}

export function validateRegister(body: unknown): ValidationResult<RegisterPayload> {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid payload" };
  }

  const raw = body as Record<string, unknown>;
  const name = safeTrim(raw.name);
  const email = safeTrim(raw.email).toLowerCase();
  const phone = safeTrim(raw.phone);
  const program = safeTrim(raw.program);
  const address = safeTrim(raw.address);
  const notes = safeTrim(raw.notes);

  if (!name || !email || !phone || !program || !address) {
    return { ok: false, error: "Name, email, phone, program, and address are required" };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: `Name must be ${MAX_NAME_LENGTH} characters or less` };
  }

  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please provide a valid email address" };
  }

  if (!phoneRegex.test(phone)) {
    return { ok: false, error: "Please provide a valid 10-digit phone number" };
  }

  if (address.length > MAX_ADDRESS_LENGTH) {
    return { ok: false, error: `Address must be ${MAX_ADDRESS_LENGTH} characters or less` };
  }

  if (notes && notes.length > MAX_NOTES_LENGTH) {
    return { ok: false, error: `Notes must be ${MAX_NOTES_LENGTH} characters or less` };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      program,
      address,
      notes,
    },
  };
}

export function validateContact(body: unknown): ValidationResult<ContactPayload> {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid payload" };
  }

  const raw = body as Record<string, unknown>;
  const name = safeTrim(raw.name);
  const email = safeTrim(raw.email).toLowerCase();
  const phone = safeTrim(raw.phone);
  const message = safeTrim(raw.message);

  if (!name || !email || !phone || !message) {
    return { ok: false, error: "All fields are required" };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: `Name must be ${MAX_NAME_LENGTH} characters or less` };
  }

  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please provide a valid email address" };
  }

  if (!phoneRegex.test(phone)) {
    return { ok: false, error: "Please provide a valid 10-digit phone number" };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less` };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      message,
    },
  };
}

export function validatePayment(body: FormData): ValidationResult<PaymentPayload> {
  const userId = safeTrim(body.get("userId"));
  const transactionId = safeTrim(body.get("transactionId"));

  if (!userId || !transactionId) {
    return { ok: false, error: "User ID and transaction ID are required" };
  }

  if (transactionId.length < 5) {
    return { ok: false, error: "Please provide a valid transaction ID" };
  }

  return {
    ok: true,
    data: {
      userId,
      transactionId,
    },
  };
}

export const limits = {
  MAX_NAME_LENGTH,
  MAX_NOTES_LENGTH,
  MAX_ADDRESS_LENGTH,
  MAX_MESSAGE_LENGTH,
};
