import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to calculate lead quality score
export function calculateLeadScore(lead: any): number {
  let score = 50 // Base score

  // Add points for completeness
  if (lead.email) score += 10
  if (lead.phone) score += 5
  if (lead.linkedin) score += 5
  if (lead.website) score += 5
  if (lead.industry) score += 5
  if (lead.employees) score += 5
  if (lead.location) score += 5

  // Add points for verification
  if (lead.verified) score += 10

  // Cap at 100
  return Math.min(score, 100)
}

// Utility function to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Utility function to validate phone format
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/
  return phoneRegex.test(phone)
}

// Utility function to format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// Utility function to generate a random ID
export function generateId(): number {
  return Math.floor(Math.random() * 1000000)
}

