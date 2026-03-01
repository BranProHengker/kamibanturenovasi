"use server";

import { createClient } from "@/lib/supabase-server";
import { headers } from "next/headers";

// Simple in-memory rate limiting map
// Key = IP Address (or "global" as fallback), Value = { emailAttempts, passwordAttempts, lockoutUntil, lastEmail }
const rateLimitStore = new Map<string, {
  emailAttempts: number;
  passwordAttempts: number;
  lockoutUntil: number | null;
  lastEmail: string | null;
}>();

const MAX_ATTEMPTS = 2;
const LOCKOUT_DURATION_MS = 7.5 * 60 * 1000; // 7 minutes 30 seconds

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  // Try to get real IP if behind proxy, else fallback
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  if (realIp) return realIp;
  return "global-fallback"; // Fallback for basic local testing
}

export async function attemptLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const ip = await getClientIp();

  // 1. Get or initialize rate limit data for this IP
  let record = rateLimitStore.get(ip);
  if (!record) {
    record = { emailAttempts: 0, passwordAttempts: 0, lockoutUntil: null, lastEmail: null };
    rateLimitStore.set(ip, record);
  }

  // 2. Check if currently locked out
  if (record.lockoutUntil && Date.now() < record.lockoutUntil) {
    const timeLeft = Math.ceil((record.lockoutUntil - Date.now()) / 1000);
    return {
      success: false,
      isLockedOut: true,
      timeLeft,
      error: "Akses dikunci."
    };
  } else if (record.lockoutUntil && Date.now() >= record.lockoutUntil) {
    // Lockout expired, reset counters
    record.emailAttempts = 0;
    record.passwordAttempts = 0;
    record.lockoutUntil = null;
  }

  // 3. Attempt Supabase Sign In
  console.log(`[AUTH] Attempting login for ${email} from IP: ${ip}`);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(`[AUTH] Supabase Result -> Error:`, error?.message, `| Session:`, !!data?.session);

  // 4. Handle Success
  if (!error && data?.session) {
    console.log(`[AUTH] Success! Clearing rate limits for IP: ${ip}`);
    rateLimitStore.delete(ip); // Clear their record on success
    return { success: true };
  }

  // 5. Handle Failure & Increment Attempts
  let isEmailError = true;
  if (record.lastEmail === email) {
    isEmailError = false; // Same email but failed again -> they are getting the password wrong
  }
  record.lastEmail = email;

  if (isEmailError) {
    record.emailAttempts++;
    console.log(`[AUTH] Email wrong. emailAttempts=${record.emailAttempts}`);
    if (record.emailAttempts >= MAX_ATTEMPTS) {
      record.lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      return {
        success: false,
        isLockedOut: true,
        timeLeft: LOCKOUT_DURATION_MS / 1000,
        error: "Email salah 2x. Akses login Anda dikunci selama 7 menit 30 detik untuk keamanan."
      };
    }
    return {
      success: false,
      isLockedOut: false,
      error: `Format atau Email salah. Kesempatan tersisa: ${MAX_ATTEMPTS - record.emailAttempts}`
    };
  } else {
    record.passwordAttempts++;
    console.log(`[AUTH] Password wrong. passwordAttempts=${record.passwordAttempts}`);
    if (record.passwordAttempts >= MAX_ATTEMPTS) {
      record.lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      return {
        success: false,
        isLockedOut: true,
        timeLeft: LOCKOUT_DURATION_MS / 1000,
        error: "Password salah 2x. Akses login Anda dikunci selama 7 menit 30 detik untuk keamanan."
      };
    }
    return {
      success: false,
      isLockedOut: false,
      error: `Password salah. Kesempatan tersisa: ${MAX_ATTEMPTS - record.passwordAttempts}`
    };
  }
}

export async function checkLockoutStatus() {
  const ip = await getClientIp();
  const record = rateLimitStore.get(ip);
  
  if (record && record.lockoutUntil && Date.now() < record.lockoutUntil) {
    const timeLeft = Math.ceil((record.lockoutUntil - Date.now()) / 1000);
    return { isLockedOut: true, timeLeft };
  }
  
  return { isLockedOut: false, timeLeft: 0 };
}
