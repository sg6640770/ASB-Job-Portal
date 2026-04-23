export const ROLE_CATEGORIES = [
  'SDR',
  'BDR',
  'Account Executive',
  'Business Development',
  'Account Manager',
  'Lead Generation',
  'Marketing',
  'Customer Success',
  'Sales Manager',
  'RevOps',
  'Other',
] as const;

export type RoleCategory = (typeof ROLE_CATEGORIES)[number];

export function getRoleCategory(jobTitle: string): RoleCategory {
  const t = (jobTitle || '').toLowerCase();
  if (
    /\bsdr\b/.test(t) ||
    t.includes('sales development representative') ||
    t.includes('sales development specialist')
  )
    return 'SDR';
  if (/\bbdr\b/.test(t) || t.includes('business development representative')) return 'BDR';
  if (t.includes('account executive')) return 'Account Executive';
  if (
    t.includes('business development manager') ||
    t.includes('business development executive') ||
    t.includes('business development associate') ||
    /\bbdm\b/.test(t) ||
    /\bbde\b/.test(t) ||
    t.includes('bd manager')
  )
    return 'Business Development';
  if (t.includes('account manager') || t.includes('key account')) return 'Account Manager';
  if (t.includes('lead generation')) return 'Lead Generation';
  if (
    t.includes('marketing') ||
    t.includes('campaign') ||
    t.includes('crm specialist') ||
    t.includes('performance marketing') ||
    t.includes('demand generation') ||
    t.includes('growth marketing') ||
    t.includes('marketing automation') ||
    t.includes('marketing analyst')
  )
    return 'Marketing';
  if (t.includes('customer success')) return 'Customer Success';
  if (
    t.includes('sales manager') ||
    t.includes('area sales') ||
    t.includes('territory sales') ||
    t.includes('sales executive') ||
    t.includes('sales consultant') ||
    t.includes('inside sales')
  )
    return 'Sales Manager';
  if (t.includes('revops') || t.includes('revenue operations') || t.includes('sales operations'))
    return 'RevOps';
  return 'Other';
}

export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';

export function getWorkMode(jobTitle: string, location: string): WorkMode {
  const combined = `${jobTitle || ''} ${location || ''}`.toLowerCase();
  if (
    combined.includes('remote') ||
    combined.includes('wfh') ||
    combined.includes('work from home')
  )
    return 'Remote';
  if ((jobTitle || '').toLowerCase().includes('hybrid')) return 'Hybrid';
  return 'Onsite';
}

export function getRelativeDate(datePosted: string): string {
  if (!datePosted) return '';
  const posted = new Date(datePosted);
  if (isNaN(posted.getTime())) return '';
  const now = new Date();

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.floor((startOfDay(now) - startOfDay(posted)) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  const months = Math.floor(diffDays / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

const AVATAR_COLORS = [
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#06B6D4',
  '#84CC16',
];

export function getCompanyAvatarColor(name: string): string {
  if (!name) return AVATAR_COLORS[0];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export function getCompanyInitials(name: string): string {
  if (!name) return '??';
  const cleaned = name.trim();
  const words = cleaned.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return cleaned.substring(0, 2).toUpperCase();
}

export function getDaysSince(datePosted: string): number {
  if (!datePosted) return Infinity;
  const posted = new Date(datePosted);
  if (isNaN(posted.getTime())) return Infinity;
  return (Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24);
}
