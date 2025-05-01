export interface SupabaseError {
  code: string;
  message: string;
  name: string;
}

// For backward compatibility
export interface CognitoError extends SupabaseError {}
