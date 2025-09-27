export type User = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  profileImage?: string;
};

// Register form üçün interface
export interface RegisterFormData {
  fullName: string;
  email: string;
  phone?: string;
  username: string;
  password: string;
  confirmPassword: string;
  file?: File | null;
}

// File upload üçün interface
export interface FileUpload {
  file: File;
  preview?: string;
  isValid?: boolean;
}