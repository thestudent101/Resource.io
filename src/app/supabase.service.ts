import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<User | null>(null);
  
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    
    // Check for existing session
    this.loadUser();
    
    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        this.currentUser.next(session.user);
      } else {
        this.currentUser.next(null);
      }
    });
  }
  
  private async loadUser() {
    const { data } = await this.supabase.auth.getUser();
    this.currentUser.next(data.user);
  }
  
  get user$(): Observable<User | null> {
    return this.currentUser.asObservable();
  }
  
  get user(): User | null {
    return this.currentUser.value;
  }
  
  // Authentication methods
  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password
    });
  }
  
  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }
  
  async signOut() {
    return this.supabase.auth.signOut();
  }
  
  async resetPassword(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
  }
  
  async updatePassword(password: string) {
    return this.supabase.auth.updateUser({
      password
    });
  }
  
  // Database methods
  async getProfile(userId: string) {
    return this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  }
  
  async updateProfile(profile: any) {
    const { id, ...updates } = profile;
    
    return this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', id);
  }
  
  // Storage methods
  async uploadProfilePicture(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `profiles/${fileName}`;
    
    const { error } = await this.supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });
      
    if (error) throw error;
    
    return this.supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
  }
  
  // Helper methods
  getClient() {
    return this.supabase;
  }
}
